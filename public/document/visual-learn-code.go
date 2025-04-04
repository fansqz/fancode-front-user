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