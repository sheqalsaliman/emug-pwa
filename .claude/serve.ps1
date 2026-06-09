param([int]$Port = 8765, [string]$Root = (Get-Location).Path)

Add-Type -AssemblyName System.Web

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"

$mime = @{
  ".html"="text/html"; ".htm"="text/html"; ".css"="text/css"; ".js"="application/javascript"
  ".json"="application/json"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"
  ".gif"="image/gif"; ".svg"="image/svg+xml"; ".ico"="image/x-icon"; ".webp"="image/webp"
  ".woff"="font/woff"; ".woff2"="font/woff2"; ".ttf"="font/ttf"; ".map"="application/json"
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    $path = [System.Web.HttpUtility]::UrlDecode($req.Url.AbsolutePath)
    if ($path -eq "/staff" -or $path -eq "/admin") { $path = "/index.html" }
    if ($path -eq "/") { $path = "/index.html" }

    $file = Join-Path $Root $path.TrimStart("/")

    if (Test-Path $file -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      $ct = $mime[$ext]; if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $res.ContentType = $ct
      $res.ContentLength64 = $bytes.Length
      # No-cache so file edits show up instantly on refresh
      $res.Headers.Add("Cache-Control", "no-store, must-revalidate")
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404: $path")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
    $res.OutputStream.Close()
    Write-Host "$($req.HttpMethod) $path -> $($res.StatusCode)"
  }
} finally {
  $listener.Stop()
}
