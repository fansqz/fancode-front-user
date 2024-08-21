import { SV, SourceNode, LayoutGroupOptions, SVNode, LayoutOptions } from "structv2"
import G6 from '@antv/g6';

SV.registerLayout('Indented', {
   
    defineOptions(_sourceData: SourceNode[]): LayoutGroupOptions {
        return {
            // 节点样式
            node: {
                default: {
                    type: 'indented-tree-node',//自定义节点
                    label: '[data]', // 节点内容样式，这里代表这获取sourceNode中的data作为展示
                    size: [60, 30], // 节点大小
                    labelOptions: {  // 其他样式
                        style: {
                            fontSize: 18,
                            fill: '#333'
                        },
                    },
                    
                }, 
            },
            // 连接线样式
            link: {  
                child: {
                    type: 'polyline',
                    sourceAnchor: 0,
                    targetAnchor: 1, 
                    style: {
                        lineAppendWidth: 4,
                        stroke: '#333',
                        endArrow: {
                            path: G6.Arrow.triangle(8, 6, 0),
                            fill: '#333'
                        },
                        startArrow: {
                            path: G6.Arrow.circle(2, -1),
                            fill: '#333'
                        }
                    }
                }

            },
            // 自定义样式
            layout: {
                xInterval: 40,
                yInterval: 10,
            },
           
        };
    },

    /**
     * 对子树进行递归布局
     */
    //判断是否是B节点
   
    layoutItem(node, elements, layoutOptions){
        if (!node) {
            return null;
        }
        
     
    
        let width = 60,
            height = 40;
 
        //还是要分第一个节点
        if (node.child) {//如果是父节点//node==B
            let childLength = node.child.length;
            console.log(childLength);
            for (let i = 0; i < childLength; i++) {
                parent = node;
                
                let tempY;
                // console.log(node.child[i].get('parent'));
                    
                node.child[i].set('x', parent.get('x') + width + layoutOptions.xInterval);
                console.log(layoutOptions.xInterval);
                if (this.isFirstChild(elements, node.child[i]))//如果是B节点{
                
                {
                    
                    node.child[i].set('y', 0 + height +layoutOptions.yInterval);
                    tempY = node.child[i].get('y')
                    console.log(tempY);
                }
                else {
                    node.child[i].set('y', tempY + height + layoutOptions.yInterval)
               }
                
                tempY = node.child[i].get('y')
                console.log(tempY);//80
                    

                   
                    
                    if (node.child[i].child) {
                    
                       
                        this.LayoutChild(node.child[i],layoutOptions);//node.child[i]==c
                        
                    }
                    if (!(node.child[i].child)) {
                       
                        // tempY= node.child[i].get('y')
                        
                        // console.log(node.get('tempY'));
                        tempY = node.child[i].get('y')

                    }
                
             
              
            }
        
        }

    },
        
    isFirstChild(elements: SVNode[], node: SVNode)
    {       
        console.log(elements);
        let root = elements[0];
           
        for (let g = 0; g < root.child.length; g++)
        {
            if (root.child[0].id === node.id)
            {
                return true;
                }
            }

    },

    LayoutChild(node: SVNode, layoutOptions: LayoutOptions) {   
        
        let parent = node;    
       //当前节点的y坐标
       //140  C=140
       let xInterval = layoutOptions.xInterval,
       yInterval = layoutOptions.yInterval;
       let tempY; 
        for (let k = 0; k < node["child"].length; k++) {
          
            if (!(node["child"][k].child))
            {    
                node["child"][k].set('x', parent.get('x') + 60 + xInterval)
                console.log( node);
                node["child"][k].set('y', tempY + 40 +yInterval)//D/F的坐标
                tempY = node["child"][k].get('y')
                console.log(tempY);
                
                
        
                
            }//node.child[k=g]
            if (node["child"][k].child) {
                node["child"][k].set('x', parent.get('x') + 60 +xInterval)
                node["child"][k].set('y', tempY + 40 +yInterval )//c
                tempY = node["child"][k].get('y');
                console.log(node["child"][k]);
                this.LayoutChild(node["child"][k], layoutOptions)
            }              
        }
    },
    //返回第一层子节点
    // isFirstChild(elements,node) {
    //     let Root = elements[0];
    //     console.log(Root);
    //     console.log(node.id);
    //     console.log(node);
    //     for (g = 0; g < Root.child.length; g++)
    //     {    
            
    //         if (Root.child[g].id === node.id) {
    //             return node;
    //  }
        
    //         }
    // },
          
    layout(elements: SVNode[], layoutOptions: LayoutOptions) {
       
        let root = elements[0];
       
        root.set({
            x: 0,
            y: 0
        });
        
        console.log(root.get('x'));
        console.log(root.get('y'));
      
        this.layoutItem(root, elements, layoutOptions);

    }

});
    










































