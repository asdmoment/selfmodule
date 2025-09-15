// ssid.js
function switchPolicyBySSID() {
  // 获取当前 Wi-Fi 的 SSID
  const currentSSID = $network.wifi.ssid;
  const targetSSID = "CUMT_Stu"; 
  const groupName = "CUMT"; 

  if (currentSSID === targetSSID) {
    $surge.setSelectGroupPolicy(groupName, "DIRECT");
    // console.log(`检测到 SSID: ${currentSSID}，策略组 '${groupName}' 已切换至 DIRECT`);
  } else {
    // 如果不是，就切换到 PROXY
    $surge.setSelectGroupPolicy(groupName, "cumtvpn");
    // console.log(`SSID: ${currentSSID}，策略组 '${groupName}' 已切换至 cumtvpn`);
  }
}

// 脚本执行入口
switchPolicyBySSID();
$done();