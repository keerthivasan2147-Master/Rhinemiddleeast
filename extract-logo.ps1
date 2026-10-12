$filePath = "c:\Users\Transa Platform\source\repos\Rhinemiddleeast\RHINE_REVIEW.html"
$outDir = "c:\Users\Transa Platform\source\repos\Rhinemiddleeast\Rhinemiddleeast\wwwroot\images"

$text = [System.IO.File]::ReadAllText($filePath)
$pattern = '(?s)<button class="brand"[^>]*><img src="data:image/([^;]+);base64,([^"]+)"'
$regex = [System.Text.RegularExpressions.Regex]::new($pattern)
$m = $regex.Match($text)

if ($m.Success) {
    $ext = $m.Groups[1].Value
    $b64 = $m.Groups[2].Value
    $bytes = [System.Convert]::FromBase64String($b64)
    $savePath = [System.IO.Path]::Combine($outDir, "rhine-logo.$ext")
    [System.IO.File]::WriteAllBytes($savePath, $bytes)
    Write-Host "Saved logo: $savePath"
}
