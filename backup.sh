while inotifywait -r -e create streams; do
    rsync -avz streams tmp
    cat tmp/streams/*.ts > downloads/file.ts &
done
