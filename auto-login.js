// --- 在这里填入你的校园网账号和密码 ---
const username = '04224040';
const password = 'Aadams923617';
// -----------------------------------------

// 校园网的 Wi-Fi 名称
const campusSsid = 'CUMT_Stu';

// 主函数
function main() {
    // 检查是否是网络变化事件，并且连接到了指定的校园网 Wi-Fi
    if ($event.type === 'network-changed' && $network.wifi.ssid === campusSsid) {
        console.log('检测到连接校园网 Wi-Fi，准备执行登录脚本...');
        login();
    } else {
        // 如果条件不符，直接结束脚本
        $done();
    }
}

// 登录函数
function login() {
    // 1. 获取当前时间戳 (毫秒)
    const timestamp = Date.now();

    // 2. 构建请求 URL
    // 使用 encodeURIComponent 对账号进行编码，防止特殊字符导致 URL 格式错误
    const encodedUsername = encodeURIComponent(username + '@cmcc');
    const url = `http://10.2.5.251:801/eportal/?c=Portal&a=login&callback=dr1756688619394&login_method=1&user_account=${encodedUsername}&user_password=${password}&wlan_user_ip=&wlan_user_mac=000000000000&wlan_ac_ip=&wlan_ac_name=&jsVersion=3.0&_=${timestamp}`;

    console.log('请求 URL: ' + url);

    // 3. 发送 GET 请求
    $httpClient.get(url, (error, response, data) => {
        if (error) {
            console.log('请求失败: ' + error);
            $notification.post('校园网登录失败', '请求错误', error);
            $done();
            return;
        }

        console.log('收到响应: ' + data);

        // 4. 根据返回的内容判断登录结果
        if (data.includes('"result":"1"')) {
            console.log('登录成功');
            $notification.post('校园网登录成功', '', '设备已连接至互联网');
        } else if (data.includes('"result":"0"')) {
            console.log('已登录');
            $notification.post('校园网已登录', '', '无需重复认证');
        } else {
            console.log('登录失败，未知响应');
            // 尝试提取 msg 字段以提供更详细的错误信息
            let msg = '服务器返回未知信息';
            try {
                // 返回的数据通常是 JSONP 格式，如 dr1756688619394({...})
                // 我们需要提取括号内的 JSON 字符串
                const jsonStr = data.match(/\((.*)\)/)[1];
                const jsonObj = JSON.parse(jsonStr);
                if (jsonObj.msg) {
                    msg = jsonObj.msg;
                }
            } catch (e) {
                // 解析失败则使用原始数据
                msg = data;
            }
            $notification.post('校园网登录失败', '', msg);
        }

        $done();
    });
}

// 执行主函数
main();