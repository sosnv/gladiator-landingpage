$sourcePath = Join-Path $PSScriptRoot '..\logo-vector.svg'
$targetPath = Join-Path $PSScriptRoot '..\public\images\gladiator-logo.svg'

$svg = [System.IO.File]::ReadAllText($sourcePath)

# Profil ICC nie jest używany przez style ścieżek i stanowi prawie cały narzut pliku.
$svg = [regex]::Replace(
  $svg,
  '<defs\s+id="defs1">.*?</defs>',
  '<defs id="defs1" />',
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

# Granice wyznaczone z renderu alfa: x=11.51..198.29, y=55.16..242.54.
# Poniższy kadr zachowuje około 2.5–3 jednostek równego marginesu.
$svg = $svg -replace 'width="210mm"', 'width="192"'
$svg = $svg -replace 'height="297mm"', 'height="193"'
$svg = $svg -replace 'viewBox="0 0 210 297"', 'viewBox="9 52.5 192 193"'

[System.IO.File]::WriteAllText(
  $targetPath,
  $svg,
  [System.Text.UTF8Encoding]::new($false)
)

Get-Item -LiteralPath $targetPath | Select-Object FullName, Length
