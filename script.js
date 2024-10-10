// Sekme geçişlerini kontrol etme fonksiyonu
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Tüm tabcontent'leri gizle ve opacity'yi sıfırla
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].style.opacity = "0";
    }

    // Tüm tablink'lerden active sınıfını kaldır
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // İlgili sekmeyi göster ve butonu active yap
    document.getElementById(tabName).style.display = "block";
    setTimeout(() => {
        document.getElementById(tabName).style.opacity = "1";
    }, 50); // smooth geçiş için kısa gecikme

    evt.currentTarget.className += " active";
}

// Sayfa yüklendiğinde varsayılan olarak ilk sekmeyi aç
document.getElementById("defaultOpen").click();

// Şifreleme fonksiyonu
function encrypt() {
    var inputText = document.getElementById("inputTextEncrypt").value;
    var key1 = document.getElementById("key1Encrypt").value;
    var key2 = document.getElementById("key2Encrypt").value;

    var aesEncrypted1 = CryptoJS.AES.encrypt(inputText, key1).toString();
    var base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(aesEncrypted1));
    var aesEncrypted2 = CryptoJS.AES.encrypt(base64Encoded, key2).toString();

    document.getElementById("outputTextEncrypt").value = aesEncrypted2;
}

// Şifre çözme fonksiyonu
function decrypt() {
    var encryptedText = document.getElementById("inputTextDecrypt").value;
    var key1 = document.getElementById("key1Decrypt").value;
    var key2 = document.getElementById("key2Decrypt").value;

    var aesDecrypted1 = CryptoJS.AES.decrypt(encryptedText, key2);
    var base64Decoded = CryptoJS.enc.Utf8.stringify(aesDecrypted1);

    var base64Parsed = CryptoJS.enc.Base64.parse(base64Decoded);
    var base64ToString = base64Parsed.toString(CryptoJS.enc.Utf8);

    var aesDecrypted2 = CryptoJS.AES.decrypt(base64ToString, key1);
    var finalText = CryptoJS.enc.Utf8.stringify(aesDecrypted2);

    document.getElementById("outputTextDecrypt").value = finalText;
}
