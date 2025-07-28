const info = {
  "sqlite": {
    types: ["INTEGER", "REAL", "TEXT", "BLOB"],
    autoIncrement: "AUTOINCREMENT",
  },
  "mysql": {
    types: ["INT", "BIGINT", "VARCHAR(255)", "TEXT", "BLOB", "FLOAT", "DOUBLE"],
    autoIncrement: "AUTO_INCREMENT",
  },
  "postgres": {
    types: ["INTEGER", "BIGINT", "TEXT", "VARCHAR(255)", "BYTEA", "REAL", "DOUBLE PRECISION"],
    autoIncrement: "SERIAL",
  },
  "sqlplus": {
    types: ["NUMBER", "VARCHAR2(255)", "DATE", "BLOB", "CLOB"],
    autoIncrement: "",
  },
  "mssql": {
    types: ["INT", "BIGINT", "VARCHAR(255)", "NVARCHAR(255)", "TEXT", "IMAGE", "FLOAT", "REAL"],
    autoIncrement: "IDENTITY(1,1)",
  }
};

function genOptions(flavor){
    let ret=''
    info[flavor]?.types.forEach(x=>{
        ret+=`<option value="${x}">${x}</option>\n`
    })
    return ret
}

function addField(flavor='sqlite', placeHolder='') {
    const tbody = document.getElementById('fieldsBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td><input class="mdl-textfield__input" value="${placeHolder}" placeholder="field_name"></td>
    <td>
        <select class='mdl-textfield__input'>
        ${genOptions(flavor)}
        </select>
    </td>
    <td><input class="mdl-checkbox__input" type="checkbox" ${placeHolder==='id'?'checked':''}></td>
    <td><input class="mdl-checkbox__input" type="checkbox" ${placeHolder!=='id'?'checked':''}></td>
    <td><input class="mdl-checkbox__input" type="checkbox" ${placeHolder==='id'?'checked':''}></td>
    <td class="action-cell"><button class="material-icons mdl-icon-toggle__label" style='border:none' onclick="deleteRow(this)">delete</button></td>
    `;
    tbody.appendChild(tr);
  
    document.getElementById('warning').innerHTML = '';
}


function deleteRow(btn) {
    btn.parentElement.parentElement.remove();
}

function validateFields() {
    const warningDiv = document.getElementById('warning');
    warningDiv.innerHTML = ''; // Clear previous warnings
    let hasErrors = false;
    
    const rows = document.querySelectorAll('#fieldsBody tr');
    if (rows.length === 0) {
        alert('Error: No fields added. Please add at least one field.');
        return false;
    }

    const fieldNames = new Set();
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        const nameInput = cells[0].querySelector('input');
        const name = nameInput.value.trim();
        
        if (!name) {
            const warning = document.createElement('div');
            warning.textContent = `Error: Field name cannot be empty (row ${index + 1})`;
            warning.style.color = 'red';
            warningDiv.appendChild(warning);
            hasErrors = true;
            nameInput.style.outline='2px solid red';
            setTimeout(function (){
            nameInput.style.outline='none';
            }, 1500);
        }
        
        if (name && fieldNames.has(name.toLowerCase())) {
            const warning = document.createElement('div');
            warning.textContent = `Warning: Duplicate field name '${name}' found (row ${index + 1})`;
            warning.style.color = 'red';
            warningDiv.appendChild(warning);
        }
        fieldNames.add(name.toLowerCase());
        
    });
    
    return !hasErrors;
}

function generateSQL() {
    document.getElementById('result').innerText = ''; // Clear previous result
    document.getElementById('warning').innerHTML = ''; // Clear previous warnings
    
    if (!validateFields()) {
        return; // Stop if validation fails
    }
    
    const tableName = document.getElementById('tableName').value.trim();
    if (!tableName) {
        alert('Error: Table name cannot be empty');
        return;
    }
    
    const flavor = document.getElementById('sqlFlavor').value;
    const autoIncrementKeyword = info[flavor]?.autoIncrement || '';
    
    const rows = document.querySelectorAll('#fieldsBody tr');
    let fields = [];
    let pkFields = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const name = cells[0].querySelector('input').value.trim();
        const type = cells[1].querySelector('select').value;
        const pk = cells[2].querySelector('input[type=checkbox]').checked;
        const nullable = cells[3].querySelector('input[type=checkbox]').checked;
        const autoIncrement = cells[4].querySelector('input[type=checkbox]').checked;
        
        if (!name) return;
        
        let fieldDef = name + ' ' + type;
        
        if (pk) {
            fieldDef += ' PRIMARY KEY';
            pkFields.push(name);
        } 
        
        if (nullable) {
            fieldDef += ' NOT NULL';
        }
        
        if (autoIncrement && autoIncrementKeyword) {
            fieldDef += ' ' + autoIncrementKeyword;
        }
        
        fields.push(fieldDef);
    });

    if (pkFields.length > 1) {
        fields.push(`PRIMARY KEY (${pkFields.join(', ')})`);
    }

    const sql = `CREATE TABLE ${tableName} (\n  ${fields.join(',\n  ')}\n);`;
    document.getElementById('result').innerText = sql;
}



window.onload = function(){
    let sqlFlavorinnerHTML=''
    Object.keys(info).forEach(x=>{
        sqlFlavorinnerHTML+=`<option value="${x}" ${x=='sqlite'?'selected':''}>${x}</option>\n`
    })
    sqlFlavor.innerHTML=sqlFlavorinnerHTML;
    
    // 监听SQL类型变化
    document.getElementById('sqlFlavor').addEventListener('change', function() {
        const flavor = this.value;
        // 更新已有行的类型选项
        const rows = document.querySelectorAll('#fieldsBody tr');
        rows.forEach(row => {
            const typeCell = row.querySelectorAll('td')[1];
            const typeSelect = typeCell.querySelector('select');
            const currentValue = typeSelect.value;
            typeSelect.innerHTML = genOptions(flavor);
            // 尝试保持相同的类型，如果新的SQL类型中有的话
            if (info[flavor]?.types.includes(currentValue)) {
                typeSelect.value = currentValue;
            }
        });
    });
    
    // 添加初始字段
    addField('sqlite','id');
}