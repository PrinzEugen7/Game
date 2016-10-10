window.onload = function() {
  var cvs = document.createElement('canvas');
  // 画面サイズ
  cvs.width = 640;
  cvs.height = 480;
  document.body.appendChild(cvs);
  var mmd = new MMD(cvs, cvs.width, cvs.height);
  mmd.initShaders();
  mmd.initParameters();
  mmd.registerKeyListener(document);
  mmd.registerMouseListener(document);
  // 使用するMMDモデルの選択
  var model = new MMD.Model('model', 'Mk-II[T].pmd');
  // MMDモデルのロード
  model.load(function() {
    mmd.addModel(model);
    mmd.initBuffers();
    mmd.start();
	// モーションの設定
    var dance = new MMD.Motion('motion/kishimen.vmd');
    dance.load(function() {
      mmd.addModelMotion(model, dance, true);
      mmd.play()
      setInterval(function() {
        console.log('fps = ' + mmd.realFps);
      }, 1000);
    });
  });
};
