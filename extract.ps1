$filePath = "c:\Users\Transa Platform\source\repos\Rhinemiddleeast\RHINE_REVIEW.html"
$outDir = "c:\Users\Transa Platform\source\repos\Rhinemiddleeast\Rhinemiddleeast\wwwroot\images"

$text = [System.IO.File]::ReadAllText($filePath)
$pattern = '(?s)<section class="page(?: active)?" id="([^"]+)"[^>]*>.*?src="data:image/([^;]+);base64,([^"]+)"'
$regex = [System.Text.RegularExpressions.Regex]::new($pattern)
$matches = $regex.Matches($text)

foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $ext = $m.Groups[2].Value
    $b64 = $m.Groups[3].Value
    Write-Host "Found section: $id, type: $ext, len: $($b64.Length)"
    $bytes = [System.Convert]::FromBase64String($b64)
    $savePath = [System.IO.Path]::Combine($outDir, "page-$id.$ext")
    [System.IO.File]::WriteAllBytes($savePath, $bytes)
    Write-Host "Saved: $savePath"
}
