'use strict';

{
    // 個々の要素について・・・
    // === html の要素を作成 ===
    class Panel {
        constructor() {
            
            // sectionタグを作成、class="panel" を追加
            const section = document.createElement('section');
            section.classList.add('panel');

            // imgタグを作成、src = ランダムな画像を追加
            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();

            // timeoutId を初期化(値が定まっていない)
            this.timeoutId = undefined;

            // divタグを作成、テキストの中身を作成、 class="stop" を追加
            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP';
            this.stop.classList.add('stop', 'inactive'); // stopは最初押せない

            // stop ボタンをクリックする動作
            this.stop.addEventListener('click', () => {

                // inactive クラスがついていたらそれ以降の処理をしない
                if (this.stop.classList.contains('inactive')) {
                    return;
                }

                // inactive クラスをつける
                this.stop.classList.add('inactive');

                // setTimeoutメソッドを止める
                clearTimeout(this.timeoutId);

                // パネル保持する変数を 1 ずつ減らす
                panelsLeft--;

                // ※パネル保持変数が 0 になった場合
                if (panelsLeft === 0) {

                    // リセット処理(もう1回遊ぶ)
                    spin.classList.remove('inactive');
                    panelsLeft = 3;

                    // 判定の処理
                    checkResult(); // 関数
                }
            });

            // sectionタグの中に imgタグとdivタグを入れ子にする
            section.appendChild(this.img);
            section.appendChild(this.stop);

            // mainタグを取得、mainタグの中に sectionタグを入れ子にする
            const main = document.querySelector('main');
            main.appendChild(section);
        }

        // ___ ランダムな画像にするメソッド ___
        getRandomImage() {

            const images = [
                'img/seven.png',
                'img/bell.png',
                'img/cherry.png',
            ];

            // ランダムに選んだ画像を返す
            return images[Math.floor(Math.random() * images.length)];
        }

        // ____ id="spin" のメソッド ___
        spin() {
            this.img.src = this.getRandomImage();

            // 50ミリ秒後に再び spin メソッドを実行
            this.timeoutId = setTimeout(() => {
                this.spin();
            }, 50); 
        }

        // ____ isUnmatchedメソッド____
        isUnmatched(p1, p2) {

            // if(this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
            //     return true;
            // } else {
            //     return false;
            // }

            // 他の画像と異なっている場合
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
        }

        // ____ unmatchメソッド____ // マッチしない
        unmatch() {

            // 色を薄くする
            this.img.classList.add('unmatched');
        }

        // ____activateメソッド____ もう1回遊ぶ
        activate() {
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');

        }
    }

    // === パネル同士を比較する関数 ===
    function checkResult() {

        // パネルを1つずつ調べ、マッチするかの判定
        if (panels[0].isUnmatched(panels[1], panels[2])) {

            panels[0].unmatch(); // unmatchメソッド呼ぶ // マッチしない
        }
        if (panels[1].isUnmatched(panels[0], panels[2])) {

            panels[1].unmatch(); // unmatchメソッド呼ぶ // マッチしない
        }
        if (panels[2].isUnmatched(panels[0], panels[1])) {

            panels[2].unmatch(); // unmatchメソッド呼ぶ // マッチしない
        }

    }

    // --- パネルを3つ作成(インスタンス生成) ---
    const panels = [
    
        new Panel(),
        new Panel(),
        new Panel(),
        
    ];

    // あといくつパネルが動いているパネルがあるか保持する変数
    let panelsLeft = 3;


    // id="spin" を取得し、spin のクリックイベント、panel の画像を切り替える
    const spin = document.getElementById('spin');
    spin.addEventListener('click', () => {

        // inactive クラスがついていたらそれ以降の処理をしない
        if (spin.classList.contains('inactive')) {
            return;
        }

        // inactive クラスをつける
        spin.classList.add('inactive');

        // パネルの回転を繰り返す
        panels.forEach(panel => {

            // リセット処理(もう1回遊ぶ)
            panel.activate(); // activateメソッドを呼ぶ

            panel.spin();
        })
    
    })
}
 