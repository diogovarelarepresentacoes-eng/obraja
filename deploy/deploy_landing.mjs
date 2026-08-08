import { Client } from 'ssh2'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const HOST = '31.97.173.136'
const USER = 'root'
const PASSWORD = 'SENHA_REMOVIDA_DO_HISTORICO'

function run(conn, cmd, timeout = 120000) {
  return new Promise((resolve, reject) => {
    console.log(`\n>>> ${cmd.trim().split('\n')[0].slice(0, 80)}`)
    conn.exec(cmd, { pty: true }, (err, stream) => {
      if (err) return reject(err)
      let output = ''
      const timer = setTimeout(() => {
        stream.close()
        resolve(output)
      }, timeout)
      stream.on('data', (d) => {
        const s = d.toString()
        process.stdout.write(s)
        output += s
      })
      stream.stderr.on('data', (d) => {
        const s = d.toString()
        process.stderr.write(s)
        output += s
      })
      stream.on('close', () => {
        clearTimeout(timer)
        resolve(output)
      })
    })
  })
}

function upload(sftp, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    const content = readFileSync(localPath, 'utf-8')
    const stream = sftp.createWriteStream(remotePath)
    stream.on('close', resolve)
    stream.on('error', reject)
    stream.write(content)
    stream.end()
  })
}

function getSftp(conn) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) reject(err)
      else resolve(sftp)
    })
  })
}

const conn = new Client()

conn.on('ready', async () => {
  console.log('CONECTADO!\n')

  // Create directories
  await run(conn, 'mkdir -p /var/www/obraja/apps/web-customer/src/app/cadastro /var/www/obraja/apps/web-customer/src/app/login /var/www/obraja/apps/web-customer/src/app/home && echo "dirs ok"')

  // Upload files via SFTP
  const sftp = await getSftp(conn)
  console.log('\n=== Uploading files via SFTP ===')

  const files = [
    ['apps/web-customer/src/app/page.tsx', '/var/www/obraja/apps/web-customer/src/app/page.tsx'],
    ['apps/web-customer/src/app/home/page.tsx', '/var/www/obraja/apps/web-customer/src/app/home/page.tsx'],
    ['apps/web-customer/src/app/cadastro/page.tsx', '/var/www/obraja/apps/web-customer/src/app/cadastro/page.tsx'],
    ['apps/web-customer/src/app/login/page.tsx', '/var/www/obraja/apps/web-customer/src/app/login/page.tsx'],
  ]

  for (const [local, remote] of files) {
    await upload(sftp, join(root, local), remote)
    console.log(`✓ ${local}`)
  }

  sftp.end()

  // Rebuild on server
  console.log('\n=== Rebuild web-customer ===')
  await run(conn, `
cd /var/www/obraja/apps/web-customer
node node_modules/next/dist/bin/next build 2>&1
`, 300000)

  // Restart PM2
  console.log('\n=== Restart obraja-customer ===')
  await run(conn, 'pm2 restart obraja-customer && pm2 save')

  // Test
  console.log('\n=== Teste final ===')
  await new Promise(r => setTimeout(r, 3000))
  await run(conn, `
echo "web-customer HTTP 3002:"
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3002/ && echo ""
echo "HTTPS divixstudio.io:"
curl -sk -o /dev/null -w "%{http_code}" https://divixstudio.io/ && echo ""
echo "HTTPS /cadastro:"
curl -sk -o /dev/null -w "%{http_code}" https://divixstudio.io/cadastro && echo ""
echo "HTML snippet:"
curl -sk https://divixstudio.io/ | grep -o '<title>[^<]*</title>' | head -1
`)

  console.log('\n=== DEPLOY CONCLUIDO! ===')
  conn.end()
})

conn.connect({ host: HOST, username: USER, password: PASSWORD, readyTimeout: 15000 })
