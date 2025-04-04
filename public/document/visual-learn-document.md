# 可视化

<div style="border: 2px solid #FF9800; border-radius: 5px; background-color: #FFF3E0; padding: 15px; margin-top: 20px;">   <i style="color: #FF9800; font-size: 24px; margin-bottom: 10px;" class="fas fa-exclamation-circle"></i><p style="color: #444;">&#9997;ShowMeCode的调试支持运行时数据结构的可视化。想要该功能需要一定配置，下面是关于可视化配置的说明。</p> </div>

## 数组可视化

我们在ShowMeCode中写入如下冒泡排序的代码（`C`语言）：

```go
#include <stdio.h>
// 冒泡排序函数
void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        // 标记是否发生交换
        int swapped = 0;
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换 arr[j] 和 arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                // 发生了交换
                swapped = 1;
            }
        }
        // 如果没有发生交换，说明数组已经有序，提前结束排序
        if (swapped == 0) {
            break;
        }
    }
}
// 打印数组函数
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("排序前的数组: \n");
    printArray(arr, n);
    bubbleSort(arr, n);
    printf("排序后的数组: \n");
    printArray(arr, n);
    return 0;
}    
```

我们想要对这段代码中的数组进行可视化调试，首先需要告诉系统，程序中使用的数组是哪个？指针是哪些？

比如在这段代码中，我们使用了`arr`这个数组，并且数组使用了`i`、`j`这些变量进行取值。我们进行以下配置（多个取值变量之间使用`,`分割）：

![Description](https://fan-code-image-1308043430.cos.ap-guangzhou.myqcloud.com/problem/file/9c7df3fd-113b-11f0-8df6-00155d03b0f2.image.png)


添加断点，并开始调试！！！


![Description](https://fan-code-image-1308043430.cos.ap-guangzhou.myqcloud.com/problem/file/daad60ba-113b-11f0-8df6-00155d03b0f2.image.png)

&nbsp;

## 链表可视化

我们在ShowMeCode中写入如下创建链表的代码（`C`语言）：

```go
package main

import "fmt"

// binarySearch 函数用于在有序整数切片中查找目标值
func binarySearch(nums []int, target int) int {
    left, right := 0, len(nums)-1
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

func main() {
    // 定义一个有序整数切片
    nums := []int{1, 3, 5, 7, 9, 11, 13}
    target := 7
    result := binarySearch(nums, target)
    if result != -1 {
        fmt.Printf("目标值 %d 在切片中的索引是 %d\n", target, result)
    } else {
        fmt.Printf("目标值 %d 不在切片中\n", target)
    }
}
```

其中，我们定义了`Node`结构体作为链表节点的结构体，其中`prev`指针指向链表当前节点上一个节点，`next`指向当前节点的下一个节点，那么我们进行以下配置：
![Description](https://fan-code-image-1308043430.cos.ap-guangzhou.myqcloud.com/problem/file/a6bf7ebf-116f-11f0-8df6-00155d03b0f2.image.png)

添加断点，并开始调试！！！

![Description](https://fan-code-image-1308043430.cos.ap-guangzhou.myqcloud.com/problem/file/c6d7bb8f-116f-11f0-8df6-00155d03b0f2.image.png)

<div style="border-left: 2px solid #FF9800; border-radius: 0 5px 5px 0; background-color: #F5F5F5; padding: 15px; margin-top: 20px;">   <i style="color: #FF9800; font-size: 24px; margin-bottom: 10px;" class="fas fa-exclamation-circle"></i>&#128075;&#128075;&#128075;<p style="color: #444;">以上完成了可视化学习，其他语言的配置同理，和C语言的配置方式是一样的</p> </div>
