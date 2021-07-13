function matching(user){
// 컨텐츠 페이지를 대상으로 코드를 실행
    chrome.tabs.executeScript({
        code: 'document.querySelector("body").innerText'
    }, function(result){
// 위 코드가 실행된 후 함수 호출, 결과를 result에 담는다
// body 태그 아래의 모든 텍스트를 가져와 결과를 bodyText에 담는다
    const bodyText = result[0];
// bodyText의 모든 단어를 추출하고, 단어의 개수를 센다, 결과를 bodyNum에 담는다
    const bodyNum = bodyText.split(' ').length;
// bodyText에서 User가 입력한 단어가 몇번 등장하는지 확인, 결과를 myNum에 담는다
    const myNum = bodyText.match(new RegExp('\\b(' + user + ')\\b', 'gi')).length;
    const per = myNum / bodyNum * 100;
    per = per.toFixed(1);

// id값이 result인 태그에 결과를 추가한다.
    document.querySelector('#result').innerText = myNum + '/' + bodyNum + '(' + (per) + '%)';
});
}

// 크롬 스토리지에 저장된 값을 가져와
chrome.storage.sync.get(function(data){
// #user의 값으로 data의 값을 입력
    document.querySelector('#user').value = data.userWords;

// 분석해서 결과를 #result에 담는다
    matching(data.userWords);
});

// 컨텐츠 페이지의 #User 값이 변경 되었을 때
document.querySelector('#user').addEventListener('change', function(){
// 컨텐츠 페이지에 단어가 몇개 등장하는지 계산
    let user = document.querySelector('#user').value;

// 크롬 스토리지에 입력값을 저장
chrome.storage.sync.set({
    userWords: user
});
    matching(user);
});