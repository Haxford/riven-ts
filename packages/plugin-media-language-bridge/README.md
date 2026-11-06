# Riven → Silo completion bridge

On Riven's `riven.media-item.download.success` event, this plugin queues a
targeted native Silo scan for the completed media directory. When Silo indexes
the matching TMDB or TVDB item, it marks the originating Silo request complete.

The plugin does not write request state directly and never exposes its Silo API
key through GraphQL.

Set:

```text
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__siloUrl=http://192.168.0.246:8090
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__siloApiKey=<Silo admin API key>
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__siloMountPath=/mnt/riven
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__moviesLibraryId=1
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__showsLibraryId=2
```
