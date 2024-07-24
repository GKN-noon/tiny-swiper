/**
 * 找到排序数组中最接近目标数字的大值
 * @param {number[]} arr - 已排序的数字数组
 * @param {number} target - 目标数字
 * @returns {number} - 最接近目标数字的值
 */
export function findClosestNumber(arr: number[], target: number): number {
  if (arr.length === 0) {
    throw new Error('数组不能为空');
  }

  let left = 0;
  let right = arr.length - 1;

  // 如果目标值小于等于数组中的最小值，直接返回最小值
  if (target <= arr[left]) {
    return arr[left];
  }

  // 如果目标值大于等于数组中的最大值，直接返回最大值
  if (target >= arr[right]) {
    return target;
  }

  // 二分查找
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return arr[mid];
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (arr[left] > target) {
    return arr[left];
  } else {
    return arr[right];
  }
}

