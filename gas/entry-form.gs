/**
 * 採用サイト エントリーフォーム処理
 * Google Apps Script - Web App
 * 
 * 機能:
 * 1. info@top-vision102.co.jp にエントリー通知メールを送信
 * 2. 応募者のメールアドレスに確認メールを自動送信
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var jobType   = data['job-type']   || '';
    var name      = data['name']       || '';
    var kana      = data['kana']       || '';
    var gender    = data['gender']     || '未選択';
    var birthdate = data['birthdate']  || '';
    var email     = data['email']      || '';
    var phone     = data['phone']      || '';
    var message   = data['message']    || 'なし';

    // 生年月日をフォーマット
    var birthdateFormatted = birthdate;
    if (birthdate) {
      var d = new Date(birthdate);
      birthdateFormatted = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
    }

    // ============================================================
    // 1. 会社への通知メール
    // ============================================================
    var companySubject = '【採用サイト】新規エントリー：' + name + ' 様';
    var companyBody = '採用サイトより新規エントリーがありました。\n\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
      + '■ 希望職種：' + jobType + '\n'
      + '■ お名前：' + name + '\n'
      + '■ フリガナ：' + kana + '\n'
      + '■ 性別：' + gender + '\n'
      + '■ 生年月日：' + birthdateFormatted + '\n'
      + '■ メールアドレス：' + email + '\n'
      + '■ 電話番号：' + phone + '\n'
      + '■ 志望動機・ご質問：\n' + message + '\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    MailApp.sendEmail({
      to: 'info@top-vision102.co.jp',
      subject: companySubject,
      body: companyBody,
      replyTo: email
    });

    // ============================================================
    // 2. 応募者への確認メール
    // ============================================================
    var applicantSubject = '【株式会社トップビジョン102】エントリーを受け付けました';
    var applicantBody = name + ' 様\n\n'
      + 'この度は株式会社トップビジョン102の採用サイトより\n'
      + 'エントリーいただき、誠にありがとうございます。\n\n'
      + '以下の内容でエントリーを受け付けました。\n\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
      + '■ 希望職種：' + jobType + '\n'
      + '■ お名前：' + name + '\n'
      + '■ フリガナ：' + kana + '\n'
      + '■ 性別：' + gender + '\n'
      + '■ 生年月日：' + birthdateFormatted + '\n'
      + '■ メールアドレス：' + email + '\n'
      + '■ 電話番号：' + phone + '\n'
      + '■ 志望動機・ご質問：\n' + message + '\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
      + '採用担当より改めてご連絡させていただきますので、\n'
      + '今しばらくお待ちください。\n\n'
      + '※このメールは自動送信されています。\n'
      + '　本メールにご返信いただいてもお答えできない場合がございます。\n\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
      + '株式会社トップビジョン102 採用担当\n'
      + '〒310-0842 茨城県水戸市千波町1795-1\n'
      + 'TEL: 029-244-3338\n'
      + 'HP: https://top-vision102.co.jp\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    MailApp.sendEmail({
      to: email,
      subject: applicantSubject,
      body: applicantBody,
      name: '株式会社トップビジョン102 採用担当'
    });

    // ============================================================
    // 成功レスポンス
    // ============================================================
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'メールを送信しました'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
