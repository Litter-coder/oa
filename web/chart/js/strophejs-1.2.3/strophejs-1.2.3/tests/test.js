// XMPP������BOSH��ַ
var BOSH_SERVICE = 'http://dinghuan-s:7070/http-bind/';

// XMPP����
var connection = null;

// ��ǰ״̬�Ƿ�����
var connected = false;

// ��ǰ��¼��JID
var jid = "";

// ����״̬�ı���¼�
function onConnect(status) {
    console.log(status)
    if (status == Strophe.Status.CONNFAIL) {
        alert("����ʧ�ܣ�");
    } else if (status == Strophe.Status.AUTHFAIL) {
        alert("��¼ʧ�ܣ�");
    } else if (status == Strophe.Status.DISCONNECTED) {
        alert("���ӶϿ���");
        connected = false;
    } else if (status == Strophe.Status.CONNECTED) {
        alert("���ӳɹ������Կ�ʼ�����ˣ�");
        connected = true;
        
        // �����յ�<message>�ڣ�����onMessage�ص�����
        connection.addHandler(onMessage, null, 'message', null, null, null);
        
        // ����Ҫ����һ��<presence>����������initial presence��
        connection.send($pres().tree());
    }
}

// ���յ�<message>
function onMessage(msg) {
    
    // ������<message>��from��type���ԣ��Լ�body��Ԫ��
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        $("#msg").append(from + ":<br>" + Strophe.getText(body) + "<br>")
    }
    return true;
}

$(document).ready(function() {

    // ͨ��BOSH����XMPP������
    $('#btn-login').click(function() {
        if(!connected) {
            connection = new Strophe.Connection(BOSH_SERVICE);
            connection.connect($("#input-jid").val(), $("#input-pwd").val(), onConnect);
            jid = $("#input-jid").val();
        }
    });
    
    // ������Ϣ
    $("#btn-send").click(function() {
        if(connected) {
            if($("#input-contacts").val() == '') {
                alert("��������ϵ�ˣ�");
                return;
            }

            // ����һ��<message>Ԫ�ز�����
            var msg = $msg({
                to: $("#input-contacts").val(), 
                from: jid, 
                type: 'chat'
            }).c("body", null, $("#input-msg").val());
            connection.send(msg.tree());

            $("#msg").append(jid + ":<br>" + $("#input-msg").val() + "<br>");
            $("#input-msg").val('');
        } else {
            alert("���ȵ�¼��");
        }
    });
});