$source = 'E:\Tiedostot\Koulu\Ohjelmointi\Fullstack\osa_2\NoteFrontend\build'
$destination = 'E:\Tiedostot\Koulu\Ohjelmointi\Fullstack\osa_3\NoteBackend'
$folderPath = "$destination\build"
npm run build
if (Test-Path $folderPath) {
    Remove-Item -Path $folderPath -Recurse
}
Copy-Item -Path $source -Recurse -Destination $destination -Container