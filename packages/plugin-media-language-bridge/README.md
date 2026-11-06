# Media Language Bridge

Reports Riven request creation and completed media paths to a self-hosted Media Language Bridge. It does not alter request routing, subtitles, torrent selection, or media files.

Enable it by adding `media-language-bridge` to `RIVEN_SETTING__enabledPlugins`, without removing existing entries, and set:

```text
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__bridgeUrl=http://media-language-bridge:8787
RIVEN_PLUGIN_SETTING__REPO_PLUGIN_MEDIA_LANGUAGE_BRIDGE__bridgeToken=<bridge bearer token>
```

The bridge URL must be reachable from the Riven container. Its reported paths are in Riven's mount namespace; Silo applies the path rewrite to its own namespace.
