$bytes = [System.IO.File]::ReadAllBytes("messages\en.json")
$bad = @()
for ($i=0; $i -lt $bytes.Length; $i++) {
    $b = $bytes[$i]
    if ($b -lt 0x09 -or ($b -gt 0x0D -and $b -lt 0x20)) {
        $bad += $i
    }
}
if ($bad.Count -eq 0) {
    Write-Host "No bad bytes found in en.json"
} else {
    Write-Host ("Bad bytes at offsets: " + ($bad -join ', '))
}
