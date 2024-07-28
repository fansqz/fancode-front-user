// @ts-nocheck
import DefaultOptions from '../defaultOptions';


export const AV_Array = {
    sourcesPreprocess(sources) {
        const firstElement = sources[0];

        if (firstElement.external) {
            firstElement.headExternal = firstElement.external;
            delete firstElement.external;
        }

        return sources;
    },

    defineLeakRule(nodes) {
        return [];
    },

    defineOptions() {
        return {
            node: {
                default: DefaultOptions.node({
                    type: 'array-node'
                }),
                sizedButNotLength: DefaultOptions.node({
                    type: 'array-node',
                    style: {
                        fill: 'transparent',
                    },
                    labelOptions: {
                        style: {
                            fill: '#99A3A4'
                        }
                    }
                })
            },
            marker: {
                headExternal: DefaultOptions.external({
                    anchor: 3
                }),
                external: DefaultOptions.external(),
                cursor: DefaultOptions.cursor()
            },
            addressLabel: DefaultOptions.addressLabel(),
            indexLabel: { 
                index: DefaultOptions.indexLabel()
            },
            behavior: {
                dragNode: false
            }
        };
    },

    layout(elements) {
        let arr = elements;

        for (let i = 0; i < arr.length; i++) {
            let width = arr[i].get('size')[0];

            if (i > 0) {
                arr[i].set('x', arr[i - 1].get('x') + width);
            }
        }
    }
}

