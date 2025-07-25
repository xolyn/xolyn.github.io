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
    <td><input value="${placeHolder}" placeholder="field_name"></td>
    <td>
        <select>
        ${genOptions(flavor)}
        </select>
    </td>
    <td><input type="checkbox" ${placeHolder==='id'?'checked':''}></td>
    <td><input type="checkbox" ${placeHolder!=='id'?'checked':''}></td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
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
            nameInput.focus();
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
    
    const rows = document.querySelectorAll('#fieldsBody tr');
    let fields = [];
    let pkFields = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const name = cells[0].querySelector('input').value.trim();
        const type = cells[1].querySelector('select').value;
        const pk = cells[2].querySelector('input[type=checkbox]').checked;
        const nullable = cells[3].querySelector('input[type=checkbox]').checked;
        
        if (!name) return;
        
        let fieldDef = name + ' ' + type;
        
        if (pk) {
            fieldDef += ' PRIMARY KEY';
            pkFields.push(name);
        } 
        
        if (nullable) {
            fieldDef += ' NOT NULL';
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
    addField('sqlite','id');
    let sqlFlavorinnerHTML=''
        Object.keys(info).forEach(x=>{
        sqlFlavorinnerHTML+=`<option value="${x}">${x}</option>\n`
    })
    sqlFlavor.innerHTML=sqlFlavorinnerHTML;
}