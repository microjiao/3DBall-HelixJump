var LayaAir3D = (function () {
    function LayaAir3D() {

        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene = Laya.stage.addChild(new Laya.Scene());

        //添加照相机
        var cameraLookAt = new Laya.Vector3(0, 0, 0);
        var cameraPos = new Laya.Vector3(0, cameraLookAt.y + 6, cameraLookAt.z + 6);
        var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
        camera.transform.translate(cameraPos);
        camera.transform.lookAt(cameraLookAt, new Laya.Vector3(0, 1, 0));



        // //创建天空盒
        // var skyBox = new Laya.SkyBox();
        // //清除标记，使用天空（必须设置，否则无法显示天空）
        // camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        // //绑定天空盒对象到摄像机
        // camera.sky = skyBox;
        // //为天空盒加载贴图文件
        // skyBox.textureCube = Laya.TextureCube.load("bg.jpg");


        camera.clearColor = new Laya.Vector3(0.5, 0.5, 0.6);

        camera.addComponent(CameraMoveScript);

        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(1, 1, 1);
        directionLight.direction = new Laya.Vector3(0, -1, -1);

        //添加自定义模型
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
        box.transform.position = new Laya.Vector3(-5, 0, 0);
        var material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        box.meshRender.material = material;


        // 圆柱
        var mainCylinderMesh = new Laya.CylinderMesh(0.55, 10);
        var mainCylinder3D = new Laya.MeshSprite3D(mainCylinderMesh);
        console.log("mainCylinderMesh", mainCylinderMesh.height);

        var mainCmaterial = new Laya.StandardMaterial();
        mainCmaterial.albedo = new Laya.Vector4(0.78 * 1.5, 0.78 * 1.5, 0.58 * 1.5, 1);
        mainCylinder3D.meshRender.material = mainCmaterial;

        mainCylinder3D.transform.position = new Laya.Vector3(0, mainCylinderMesh.height >> 1, 0);
        scene.addChild(mainCylinder3D);

        for (var i = 0; i < 3; i++) {
            var CylinderMesh = new Laya.CylinderMesh(1.2, 0.25);
            var Cylinder3D = new Laya.MeshSprite3D(CylinderMesh);
            console.log(CylinderMesh.height);

            var mainCmaterial = new Laya.StandardMaterial();
            mainCmaterial.albedo = new Laya.Vector4(0.3, 0.3, 0.5, 1);
            Cylinder3D.meshRender.material = mainCmaterial;

            var y = (i + 1) * 1.8;
            Cylinder3D.transform.position = new Laya.Vector3(0, y, 0);
            scene.addChild(Cylinder3D);
        }
        var ballMesh = new Laya.SphereMesh(0.1);
        this.ball3D = new Laya.MeshSprite3D(ballMesh);
        var ballMaterial = new Laya.StandardMaterial();
        ballMaterial.albedo = new Laya.Vector4(0.23, 0.7, 0.86, 1);
        this.ball3D.meshRender.material = ballMaterial;

        ballPos = new Laya.Vector3(0, cameraPos.y - 2.2, 0.9);
        this.ball3D.transform.position = ballPos;


        scene.addChild(this.ball3D);

        // Laya.timer.frameLoop(1, this, function(){
        //     var offset = new Laya.Vector3(0, 0.1, 0);
        //     var pos = new Laya.Vector3();
        //     Laya.Vector3.add(this.ball3D.transform.position , offset, pos);
        //     this.ball3D.transform.position = pos;
        // });
        var beginPos_y = cameraPos.y - 2.2;
        var gravity = -0.01;
        var speed = 0.1;
        var pos = new Laya.Vector3();
        Laya.timer.frameLoop(1, this, function () {
            speed += gravity;
            pos.y = speed;
            // var offset_y = 0.1;
            // this.ball3D.transform.position.y += offset_y;
            this.ball3D.transform.translate(pos);
            console.log("ballPos: ", ...ballPos.elements, "b3D", ...this.ball3D.transform.position.elements);

            // if (ballPos.y < beginPos_y) {
            //     var newBallPos = new Laya.Vector3();
            //     Laya.Vector3.add(ballPos, new Laya.Vector3(0, beginPos_y, 0), newBallPos)
            //     this.ball3D.transform.position = newBallPos;
            //     speed *= -1;
            // }
        });

        // var ballPos = new Laya.Vector3(0, 3.9, 0);
        // console.log(ball3D.transform.position.y);
        // Laya.Tween.to(this.ball3D.transform.position, {
        //     y: 3.9
        // },500);
        // 地面
        var plane = scene.addChild(new Laya.MeshSprite3D(new Laya.PlaneMesh(6, 6, 10, 10)));

    }



    return LayaAir3D;
}());

LayaAir3D();