import { SV } from "structv2"
import G6 from '@antv/g6';



SV.registerLayout('Force', {
    defineOptions() {
        return {
            node: {
                default: {
                    type: 'force-node',
                    label: '[data]',
                    size: 20,
                    labelOptions: {
                        style: { fontSize: 20 }
                    },
                    style: {
                        stroke: 'red',
                        fill: 'red'
                    }
                }
            },
            link: {
                next: { 
                    type: 'line',
                    sourceAnchor: 0,
                    targetAnchor: 0,
                    style: {
                        stroke: '#333',
                        lineAppendWidth: 6,
                        cursor: 'pointer',
                        // endArrow: 'default',
                        startArrow: {
                            path: Arrow.circle(2, -1), 
                            fill: '#333'
                        }
                    }
                }
            },
            marker: {
                headExternal: {
                    type: 'pointer',
                    anchor: 3,
                    style: {
                        fill: '#f08a5d'
                    }
                },
                external: {
                    type: 'pointer',
                    anchor: 0,
                    style: {
                        fill: '#f08a5d'
                    }
                }
            },
            indexLabel: {
                index: { position: 'bottom' },
                indexRight: { position: 'right' }
            },
            behavior: {
                dragNode: true
            }
        };
    },

    layout(e) {
        
    }
});

