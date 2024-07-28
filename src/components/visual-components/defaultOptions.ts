// @ts-nocheck
import { SV } from '@/assets/js/sv';
import merge from 'merge';

const G6 = SV.G6;


export const THEMES_DATA = {
    light: {
        nodeStroke: '#333',
        nodeBgFill: '#eee',
        linkStroke: '#333',
        markerLabelFill: '#999',
        addressLabelFill: '#999',
        indexLabelFill: '#bbb'
    },
    dark: {
        nodeStroke: '#ccc',
        nodeBgFill: '#ddd',
        linkStroke: '#ffff00',
        markerLabelFill: '#ccc',
        addressLabelFill: '#ccc',
        indexLabelFill: '#ccc'
    }
};

export const CURRENT_THEME = { value: { ...THEMES_DATA.light } };


export default {
    node(nodeOptions = { }) {
        return merge.recursive({
            size: [60, 30],
            label: '[data]',
            style: {
                fill: '#95e1d3',
                stroke: '#333',
                cursor: 'pointer',
                backgroundFill:  CURRENT_THEME.value.nodeBgFill
            },
            labelOptions: {
                style: { fontSize: 16 }
            }
        }, nodeOptions);
    },
    link(linkOptions = { }) {
        return merge.recursive({
            type: 'line',
            sourceAnchor: 2,
            targetAnchor: 6,
            style: {
                stroke: CURRENT_THEME.value.linkStroke,
                lineAppendWidth: 10,
                lineWidth: 1.6,
                endArrow: 'default',
                startArrow: {
                    path: G6.Arrow.circle(2, -1), 
                    fill: CURRENT_THEME.value.linkStroke
                }
            }
        }, linkOptions);
    },
    plainLink(linkOptions = { }) {
        return merge.recursive({
            type: 'line',
            style: {
                lineAppendWidth: 10,
                lineWidth: 1.6,
                stroke: CURRENT_THEME.value.linkStroke
            }
        }, linkOptions);
    },
    indexLabel(indexLabelOptions = { }) {
        return merge.recursive({
            position: 'bottom',
            style: {
                fill: CURRENT_THEME.value.indexLabelFill
            }
        }, indexLabelOptions);
    },
    addressLabel() {
        return {
            style: {
                fill: CURRENT_THEME.value.addressLabelFill
            }
        }
    },
    external(externalOptions = {  }) {
        return merge.recursive({
            type: 'pointer',
            anchor: 0,
            offset: 8,
            labelOffset: 2,
            style: {
                fill: '#f08a5d'
            },
            labelOptions: {
                style: {
                    fontSize: 15,
                    fill: CURRENT_THEME.value.markerLabelFill
                }
            }
        }, externalOptions);
    },
    cursor(cursorOptions = {  }) {
        return merge.recursive({
            type: 'cursor',
            anchor: 0,
            offset: 8,
            labelOffset: 2,
            style: {
                fill: '#f08a5d'
            },
            labelOptions: {
                style: {
                    fontSize: 15,
                    fill: CURRENT_THEME.value.markerLabelFill
                }
            }
        }, cursorOptions);
    }
};





