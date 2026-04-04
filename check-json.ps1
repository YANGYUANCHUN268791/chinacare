$ErrorActionPreference = 'Continue'
try {
    $null = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes('messages/en.json'))
    $json = [System.IO.File]::ReadAllText('messages/en.json', [System.Text.Encoding]::UTF8)
    $null = [Newtonsoft.Json.JsonConvert]::DeserializeObject($json)
    Write-Host "en.json: Valid JSON"
} catch {
    Write-Host "en.json: ERROR - $($_.Exception.Message)"
}

try {
    $json2 = [System.IO.File]::ReadAllText('messages/zh.json', [System.Text.Encoding]::UTF8)
    $null = [Newtonsoft.Json.JsonConvert]::DeserializeObject($json2)
    Write-Host "zh.json: Valid JSON"
} catch {
    Write-Host "zh.json: ERROR - $($_.Exception.Message)"
}

# Check for non-printable characters
$bytes = [System.IO.File]::ReadAllBytes('messages/en.json')
for ($i = 0; $i -lt $bytes.Length; $i++) {
    $b = $bytes[$i]
    if ($b -lt 0x09 -or ($b -gt 0x0D -and $b -lt 0x20)) {
        $line = 1 + ($bytes[0..$i] -eq 10).Count
        Write-Host "Bad byte 0x$($b.ToString('X2')) at offset $i (approx line $line)"
    }
}
Write-Host "Scan complete."
