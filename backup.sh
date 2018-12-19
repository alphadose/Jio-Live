while inotifywait -r -e create streams; do
    rsync -avz streams tmp
done
