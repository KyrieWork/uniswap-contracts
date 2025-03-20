# chmod +x merge_json_dirs.sh
#!/bin/bash

# 定义链 ID
CHAIN_ID=141491
JSON_FILE_PATH_START="./projects"
JSON_FILE_PATH_END="ignition/deployments/chain-$CHAIN_ID/deployed_addresses.json"

# 定义 JSON 文件的路径数组（注意：这里是文件路径，不是目录）
JSON_FILES=(
    "$JSON_FILE_PATH_START/weth/$JSON_FILE_PATH_END"
    "$JSON_FILE_PATH_START/v3-core/$JSON_FILE_PATH_END"
    "$JSON_FILE_PATH_START/v3-periphery/$JSON_FILE_PATH_END"
    "$JSON_FILE_PATH_START/tether-token/$JSON_FILE_PATH_END"
)

# 定义输出文件路径
OUTPUT_FILE=./out/deployed_chain-$CHAIN_ID.json

echo "删除旧文件"
rm -rf $OUTPUT_FILE

echo "正在从以下文件合并 JSON 数据到 $OUTPUT_FILE:"

# 打印文件列表
for file in "${JSON_FILES[@]}"; do
    echo " - $file"
done

# 检查是否安装了 jq
if ! command -v jq > /dev/null; then
    echo "错误：未安装 jq，请先安装 jq 后重试。"
    exit 1
fi

# 初始化一个空数组到输出文件
echo "[]" > "$OUTPUT_FILE"

# 遍历每个 JSON 文件
for JSON_FILE in "${JSON_FILES[@]}"; do
    # 检查文件是否存在
    if [ ! -f "$JSON_FILE" ]; then
        echo "警告：文件 $JSON_FILE 不存在，跳过。"
        continue
    fi

    echo "正在将 $JSON_FILE 添加到数组..."
    # 将当前 JSON 文件的内容作为新元素添加到数组中
    jq --argjson new "$(cat "$JSON_FILE")" '. + [$new]' "$OUTPUT_FILE" > "${OUTPUT_FILE}.tmp"
    mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"
done

echo "合并完成，输出文件：$OUTPUT_FILE"