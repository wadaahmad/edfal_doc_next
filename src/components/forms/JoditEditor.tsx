import { useImageRepo } from '~/repository/images/imageRepo'
import 'jodit/build/jodit.min.css'
import { useEffect, useRef } from 'react'
var jodit: any
if (typeof window !== 'undefined')
    jodit = require('jodit')

interface JoditEditor{
    value:string,
    changed:(val:string)=>void
}
export default function JoditEditor(props:JoditEditor){
    const joditContainer = useRef()
    const content = useRef(props.value)
    // watch(() => props.value, (newValue) => {
    //     content.value = newValue
    // })
    let { image_host, image_user, image_pass } = useImageRepo()
    useEffect(() => {
        var editor = new jodit.Jodit(joditContainer.current, {
            zIndex: 0,
            readonly: false,
            activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
            toolbarButtonSize: 'middle',
            theme: 'default',
            saveModeInCookie: false,
            spellcheck: true,
            editorCssClass: false,
            triggerChangeEvent: true,
            width: '100%',
            height: 'auto',
            minHeight: 300,
            direction: '',
            language: 'en',
            debugLanguage: false,
            tabIndex: -1,
            toolbar: true,
            enter: "P",
            useSplitMode: false,
            colors: {
                greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
                palette: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
                full: [
                    '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
                    '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
                    '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
                    '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
                    '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
                    '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
                ]
            },
            colorPickerDefaultTab: 'background',
            removeButtons: [],
            toolbarAdaptive: false,
            disablePlugins: [],
            extraButtons: [],
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,
            buttons: [
                'source', '|',
                'bold',
                'strikethrough',
                'underline',
                'italic', '|',
                'ul',
                'ol', '|',
                'outdent', 'indent', '|',
                'font',
                'fontsize',
                'brush',
                'paragraph', '|',
                'image',
                'video',
                'table',
                'link', '|',
                'align', 'undo', 'redo', '|',
                'hr',
                'eraser',
                'copyformat', '|',
                'symbol',
                'fullsize',
                'print',
                'about'
            ],
            buttonsXS: [
                'bold',
                'image', '|',
                'brush',
                'paragraph', '|',
                'align', '|',
                'undo', 'redo', '|',
                'eraser',
                'dots'
            ],
            events: {},
            textIcons: false,
            uploader: {
                insertImageAsBase64URI: false,
                url: image_host + '/image',
                format: 'json',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(image_user + ':' + image_pass).toString('base64')
                },
                filesVariableName: function (e: any) {
                    return "images";
                },
                isSuccess: function (resp: any) {
                    return !resp.error;
                },
                getMessage: function (resp: any) {
                    return resp.msg;
                },
                process: function (resp: any) {
                    return {
                        files: resp.data || [],
                        path: resp.path,
                        baseurl: resp.baseurl,
                        error: resp.error,
                        msg: resp.messages
                    };
                },
                defaultHandlerSuccess: function (data: any, resp: any) {
                    console
                    editor.selection.insertImage(data.files.url);
                },
                error: function (e: any) {
                    editor.selection.fire('errorMessage', [e.getMessage(), 'error', 4000]);
                }
            }
        })
        editor.value = content.current
        editor.events.on('change', (newValue: any) => props.changed(newValue))
    })
    return <textarea ref="joditContainer"></textarea>
}



  