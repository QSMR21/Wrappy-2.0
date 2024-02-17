import * as FilePond from 'FilePond'
import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import * as FilePondPluginImageResize from 'filepond-plugin-image-resize'
import * as FilePondPluginFileEncode from 'filepond-plugin-file-encode'


FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)

FilePond.setOptions({
    stylePanelAspectRatio: '1:1',
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 100,
    credits: false
})
FilePond.parse(document.body)
