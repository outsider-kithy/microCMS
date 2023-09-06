window.addEventListener("DOMContentLoaded", function(){
    const { createClient } = microcms;

    const client = createClient({
        serviceDomain: 'outsider', // service-domain は XXXX.microcms.io の XXXX 部分
        apiKey: 'BXQjK3n0QdV0rwNiCiqyU6j0Q4u36nJgpEPV',
    });

    //お知らせ（news）をmicroCMSから取得して表示
    client.get({ endpoint: 'news'}).then((res) => {
        
        const news = document.getElementById('news');
        
        //resの数だけ繰り返す
        for (let i = 0; i < res.contents.length; i++) {

            let date = res.contents[i].date;
            //dateをDate型に変換
            let formedDate = new Date(date);
            //formedDateをYYYY/MM/DDに変換
            formedDate = formedDate.getFullYear() + '.' + (formedDate.getMonth() + 1) + '.' + formedDate.getDate();

            let paragraph = res.contents[i].paragraph;
            //htmlに追加
            news.insertAdjacentHTML(
                'beforeend',
                '<dl><dt>' + formedDate + '</dt><dd>' + paragraph + '</dd></dl>'
            );
        }
    });

    //投稿(posts)をmicroCMSから取得して表示
    client.get({ endpoint: 'posts'}).then((res) =>{
        
        const posts = document.getElementById('posts');

        //resの数だけ繰り返す
        for(let i = 0; i < res.contents.length; i++){

            let comment = res.contents[i].comment;
            let date = res.contents[i].date;
            //dateをDate型に変換
            let formedDate = new Date(date);
            //formedDateをYYYY/MM/DDに変換
            formedDate = formedDate.getFullYear() + '.' + (formedDate.getMonth() + 1) + '.' + formedDate.getDate();
            
            let image = res.contents[i].image;

            posts.insertAdjacentHTML(
                'beforeend', 
                '<div class="post">' +
                '<p class="comment">' + comment + '</p>' +
                '<p class="date">' + formedDate + '</p>' +
                '<img src="' + image.url + '" alt="' + comment + '">' +
                '</div>'
            );
        }
    });

});
