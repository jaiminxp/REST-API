export default {
  port: 1337,
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  publicKey: `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBkkxP//0mazePiL2XoFCLz
BkiI1Dd9TsrpJmLggjX4MQ8bmrJPKQEYBxFhFeRrFUMRj9PraPQ7nuBR26PwGNUJ
RwfVg3HjTyqCVwWSpkH9XAwus5ZobUDA4dby0TJNZxEHKNcVdJs3Nn9dCSGUQOzw
QBrPX60oWy5uIDqRczpttD889XTRkf3QA0h/TL3WhSg4oZNxKZ8KaqDDvzfnNH5Y
pBh/vN2NZmBDaU7N28paYjDo5p/YEfr30YJ3p+VGJjRgmWq2rJ1j5RuZWS9GNgcw
8jXuQVsmtOthSCJ16GOSUv9PtWenegUaKIDDy3i+EDtpp+qXwrDDpFPZKQ3xtoRJ
PuMj2gO3IwABarKFVPSN/tX1knagcw7UDID1qWUu4DriEiev9lEGDfvjmFQ4sq+l
cGrKRb+kDrvYoINhcsPX6jZbcPiilVTYgoCN3ofcI+5tFQpI1LgdiHHeRbDUkk+R
3kkNfOmqzTAdDO/+XcdfpHySsEbuDVogGjH9VGgzp6oW9MV/5xp1P7WKEdHWVJSF
6sUmmYqxHxTNN9OKU3yzmmFDkzJRjNz5WY7T6UqqE8dVHqrv3BeAvTAlH60g2pNR
Q2HpnL3CqsiTbuGhZ1ael1rWOIlotTDWmK2L9Oso4yQ7od01kMxwz0zihwaDNIGK
A5kCppWf9dj04sCKQouHQQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`,
}