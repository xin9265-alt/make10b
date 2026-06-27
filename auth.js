(function() {
  if (sessionStorage.getItem('make10b_auth') === '1') return;

  var PWD_HASH = '3155f45a389a2d46592a622c28f456df891d532a751a03ae4ecd7efa142e24e6';

  function sha256(str) {
    function rotr(x,n){return(x>>>n)|(x<<(32-n))}
    function ch(x,y,z){return(x&y)^(~x&z)}
    function maj(x,y,z){return(x&y)^(x&z)^(y&z)}
    function bsig0(x){return rotr(x,2)^rotr(x,13)^rotr(x,22)}
    function bsig1(x){return rotr(x,6)^rotr(x,11)^rotr(x,25)}
    function ssig0(x){return rotr(x,7)^rotr(x,18)^(x>>>3)}
    function ssig1(x){return rotr(x,17)^rotr(x,19)^(x>>>10)}
    function toBytes(s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return b}
    var K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var msg=toBytes(str);var ml=msg.length*8;msg.push(0x80);
    while((msg.length*8)%512!==448)msg.push(0);
    for(var i=7;i>=0;i--)msg.push((ml/Math.pow(2,i*8))>>>0&255);
    var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    for(var b=0;b<msg.length;b+=64){
      var W=new Array(64);
      for(var i=0;i<16;i++)W[i]=(msg[b+i*4]<<24)|(msg[b+i*4+1]<<16)|(msg[b+i*4+2]<<8)|msg[b+i*4+3];
      for(i=16;i<64;i++)W[i]=(ssig1(W[i-2])+W[i-7]+ssig0(W[i-15])+W[i-16])>>>0;
      var a=H[0],b2=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
      for(i=0;i<64;i++){
        var T1=(h+bsig1(e)+ch(e,f,g)+K[i]+W[i])>>>0;
        var T2=(bsig0(a)+maj(a,b2,c))>>>0;
        h=g;g=f;f=e;e=(d+T1)>>>0;d=c;c=b2;b2=a;a=(T1+T2)>>>0;
      }
      H[0]=(H[0]+a)>>>0;H[1]=(H[1]+b2)>>>0;H[2]=(H[2]+c)>>>0;H[3]=(H[3]+d)>>>0;
      H[4]=(H[4]+e)>>>0;H[5]=(H[5]+f)>>>0;H[6]=(H[6]+g)>>>0;H[7]=(H[7]+h)>>>0;
    }
    var hex='';for(i=0;i<8;i++)hex+=('0000000'+H[i].toString(16)).slice(-8);
    return hex;
  }

  var lockHTML = '<div id="authLock" style="position:fixed;inset:0;background:#0b1120;display:flex;align-items:center;justify-content:center;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif">' +
    '<div style="text-align:center;width:360px;max-width:90vw">' +
    '<div style="font-size:48px;margin-bottom:20px">&#x1F512;</div>' +
    '<h2 style="font-size:22px;font-weight:700;color:#e2e8f0;margin-bottom:8px">访问验证</h2>' +
    '<p style="font-size:13px;color:#64748b;margin-bottom:28px">请输入密码以访问此页面</p>' +
    '<input id="authPwd" type="password" placeholder="输入密码" autofocus style="width:100%;padding:14px 18px;border:1px solid #334155;border-radius:12px;background:#1e293b;color:#e2e8f0;font-size:16px;outline:none;text-align:center;letter-spacing:2px;box-sizing:border-box">' +
    '<div id="authError" style="font-size:13px;color:#ef4444;margin-top:10px;min-height:20px"></div>' +
    '<button id="authBtn" style="width:100%;margin-top:14px;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;font-size:16px;font-weight:600;cursor:pointer">验证进入</button>' +
    '<div id="googleLoginSection" style="display:none;margin-top:20px">' +
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div style="flex:1;height:1px;background:#334155"></div><span style="font-size:12px;color:#64748b">或</span><div style="flex:1;height:1px;background:#334155"></div></div>' +
    '<div id="g_id_signin" style="display:flex;justify-content:center"></div>' +
    '</div>' +
    '</div></div>';

  document.addEventListener('DOMContentLoaded', function() {
    // 隐藏 body 原有内容
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i].id !== 'authLock') {
        children[i].style.display = 'none';
        children[i].setAttribute('data-auth-hidden', '1');
      }
    }
    // 插入锁屏
    document.body.insertAdjacentHTML('afterbegin', lockHTML);

    function checkPwd() {
      var input = document.getElementById('authPwd').value;
      if (sha256(input) === PWD_HASH) {
        sessionStorage.setItem('make10b_auth', '1');
        var lock = document.getElementById('authLock');
        if (lock) lock.remove();
        var hidden = document.querySelectorAll('[data-auth-hidden]');
        for (var j = 0; j < hidden.length; j++) {
          hidden[j].style.display = '';
          hidden[j].removeAttribute('data-auth-hidden');
        }
      } else {
        document.getElementById('authError').textContent = '密码错误，请重试';
        document.getElementById('authPwd').value = '';
        document.getElementById('authPwd').focus();
      }
    }

    document.getElementById('authBtn').addEventListener('click', checkPwd);
    document.getElementById('authPwd').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') checkPwd();
    });

    // Google 登录区域展示
    if (window.MAKE10B_GOOGLE_CLIENT_ID) {
      var gs = document.getElementById('googleLoginSection');
      if (gs) gs.style.display = 'block';
    }
  });
})();
