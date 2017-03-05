<?php
    $screen_name = 'Kayak2017';
    $count = 1; // How many tweets to output
    $retweets = 0; // 0 to exclude, 1 to include
 
    // Populate these with the keys/tokens you just obtained
    $oauthAccessToken = '764566588959981568-ZvEnHf1IO2o81Z1VSZt6tAgUsQbxsoD';
    $oauthAccessTokenSecret = 'uN3npfB3gFQYfJfIw1z9aVwy4OKx3YOKg4DspnG2z4le6';
    $oauthConsumerKey = 'zRlLm4NsYP3Eixi1megMZPesW';
    $oauthConsumerSecret = 'NS3hQZQZKSgkDQKMp1Z9qxsBmOKY6wiIsd6BJr7IMmCdNSc0qj';
 
    // First we populate an array with the parameters needed by the API
    $oauth = array(
        'count' => $count,
        'include_rts' => $retweets,
        'oauth_consumer_key' => $oauthConsumerKey,
        'oauth_nonce' => time(),
        'oauth_signature_method' => 'HMAC-SHA1',
        'oauth_timestamp' => time(),
        'oauth_token' => $oauthAccessToken,
        'oauth_version' => '1.0'
    );
 
    $arr = array();
    foreach($oauth as $key => $val)
        $arr[] = $key.'='.rawurlencode($val);
 
    // Then we create an encypted hash of these values to prove to the API that they weren't tampered with during transfer
    $oauth['oauth_signature'] = base64_encode(hash_hmac('sha1', 'GET&'.rawurlencode('https://api.twitter.com/1.1/statuses/user_timeline.json').'&'.rawurlencode(implode('&', $arr)), rawurlencode($oauthConsumerSecret).'&'.rawurlencode($oauthAccessTokenSecret), true));
 
    $arr = array();
    foreach($oauth as $key => $val)
        $arr[] = $key.'="'.rawurlencode($val).'"';
 
    // Next we use Curl to access the API, passing our parameters and the security hash within the call
    $tweets = curl_init();
    curl_setopt_array($tweets, array(
        CURLOPT_HTTPHEADER => array('Authorization: OAuth '.implode(', ', $arr), 'Expect:'),
        CURLOPT_HEADER => false,
        CURLOPT_URL => 'https://api.twitter.com/1.1/statuses/user_timeline.json?count='.$count.'&include_rts='.$retweets,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
    ));
    $json = curl_exec($tweets);
    curl_close($tweets);
 
    // $json now contains the response from the Twitter API, which should include however many tweets we asked for.
 
    // Loop through them for output
    foreach(json_decode($json) as $status) {
        // Convert links back into actual links, otherwise they're just output as text
        $enhancedStatus = htmlentities($status->text, ENT_QUOTES, 'UTF-8');
        $enhancedStatus = preg_replace('/http:\/\/t.co\/([a-zA-Z0-9]+)/i', '<a href="http://t.co/$1">http://$1</a>', $enhancedStatus);
        $enhancedStatus = preg_replace('/https:\/\/t.co\/([a-zA-Z0-9]+)/i', '<a href="https://t.co/$1">http://$1</a>', $enhancedStatus);
 
        // Finally, output a simple paragraph containing the tweet and a link back to the Twitter account itself. You can format/style this as you like.
        echo '<p>"'.$enhancedStatus.'"</p>';
    }
?>