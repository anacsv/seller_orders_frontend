var seller_orders_api = 'http://127.0.0.1:5000/api/seller-orders/'

// ---------------------------------------- Load data Json File
function load_data_json(){
    $.ajax({
        url : seller_orders_api
        ,dataType : 'json'
        ,type : 'get'
        ,success: (data)=>{
            load_data(data);
        },
        error:(e)=>{
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')
        }
    });
}
// ---------------------------------------- END Load data Json File
function update(data, id) {
    $.ajax({
        type : 'PUT',
        url: seller_orders_api+id,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: () => {
            load_data_json();
        },
        error: (e) => {
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')
        }
    });
}

function toJson(data) {
    let obj = {};
    obj['code'] = data[1].value;
    obj['order_id'] = data[2].value;
    obj['seller_name'] = data[3].value;
    obj['status'] = data[4].value;
    obj['seller_brand'] = data[5].value;
    return obj
}

// ---------------------------------------- Load Json 
function load_data(data){ 
    data.forEach(e => {
        data += `<tr>
            <td>${e['code']}</td>
            <td>${e['order_id']}</td>"
            <td>${e['seller_name']}</td>"
            <td>${e['status']}</td>
            <td>${e['seller_brand']}</td>"
            <td data-id="${e['id']}" >
                <a class='btn-edit' href='seller_orders/form.html?id=${e['id']}'>Editar</a> |
                <a class='btn-delete' href='#'>Deletar</a>
            </td>
        </tr>`;
    });
    
    $('table tbody').html(data).promise().done(()=>{
        $('.btn-edit').click( (event)=>btnClick(event) );
        $('.btn-delete').click( (event)=>btnDelete(event) );
    });
}
// ---------------------------------------- END Load Json 

function delete_data(id){
    $.ajax({
        url : seller_orders_api + id,
        type: 'DELETE',
        success: (data) => {
            load_data_json();
        },
        error: (e) => {
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')
        }
    })
}


// ---------------------------------------- Find id in Json File and Load html
function findById(id){
    $.ajax({
        url : seller_orders_api+id
        ,dataType : 'json'
        ,type : 'get'
        ,success: (data)=>{
            $("[name='id']").val(data.id);
            $("[name='code']").val(data.code);
            $("[name='order_id']").val(data.order_id);
            $("[name='seller_name']").val(data.seller_name);
            $("[name='status']").val(data.status);
            $("[name='seller_brand']").val(data.seller_brand);
        }
    });
}
// ---------------------------------------- END Find id in Json File and Load html


function save(data) {
    $.ajax({
        type : 'POST',
        url: seller_orders_api,
        contentType: 'application/json',
        data: data,
        success: () => {
            load_data_json();
        },
        error: (e) => {
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')
        }
    });
}
$(document).ready(()=>load_data_json());