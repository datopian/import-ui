import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader';

const fieldTypes = {
  string: ['default', 'email', 'uri', 'binary', 'uuid'],
  number: ['default'],
  integer: ['default'],
  boolean: ['default'],
  object: ['default'],
  array: ['default'],
  date: ['default', 'custom', 'any'],
  time: ['default', 'custom', 'any'],
  datetime: ['default', 'custom', 'any'],
  year: ['default'],
  yearmonth: ['default'],
  duration: ['default'],
  geopoint: ['default', 'array', 'object'],
  geojson: ['default', 'topojson'],
  any: ['default'],
};

const options = Object.keys(fieldTypes).map((r) => r );

const formats = (type) => {
  return fieldTypes[type];
}

export default class SchemaTable extends React.Component {

  colorCheck(n) {
    if (n === 1) {
      return <span className='number' style={{backgroundColor: "red"}}>{n}</span>
    }
    return <span className='number'>{n}</span>
  }

  typeSelect(value, index, column, tableSchema, updateTableSchemaType) {
    let selectOptions = options.map((option) => {
      const key = `${value}-${option}-${index}`;
      return <option key={key}>{option}</option>
    });
    return <select data-tag={column} onChange={updateTableSchemaType} value={value} className="form-control schema select" name='schema-select'>{selectOptions}</select>
  }

  formatSelect(value, index, column, tableSchema, updateTableSchemaFormat) {
    let selectOptions = formats(value.type).map((option) => {
      const key = `${value}-${option}-${index}`;
      return <option key={key}>{option}</option>
    });
    return <select data-tag={column} onChange={updateTableSchemaFormat} value={value.format} className="form-control schema select" name='schema-select'>{selectOptions}</select>
  }

  schemaCell(props, tableSchema, updateTableSchemaType, updateTableSchemaFormat, updateTableSchemaDesc) {
    const column = props.column.Header;
    if (props.index === 0) {
      return (
			  <div onBlur={updateTableSchemaDesc} tabIndex="1" className="edit-schema-cont">
          <input className="edit-schema-input" type="text" key={`${column}-desc-input`} data-tag={column} defaultValue={props.value} /><FontAwesomeIcon icon={faEdit} />
        </div>
               )
     } else if (props.index === 1) {
       return (
       <div>
        {this.typeSelect(props.value, props.index, column, tableSchema, updateTableSchemaType)}
       </div>
       )
     } else if (props.index === 2) {
       return (
       <div>
        {this.formatSelect(props.value, props.index, column, tableSchema, updateTableSchemaFormat)}
       </div>
       )
     }
     else {
       return(
         <div>
          {props.value};
         </div>
       )
     }
  }


  renderEditable(cellInfo, updateDataFromCell, data) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
				onBlur={e => {
					updateDataFromCell(e, cellInfo);
        }}
        dangerouslySetInnerHTML={{
          __html: data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }	
  render() {
    const { data, defaultPageSize, columns, tableSchema, updateTableSchemaType, updateTableSchemaFormat, updateTableSchemaDesc, updateDataFromCell } = this.props;
    const desc = Object.values(tableSchema).reduce((r, v) => { const desc = 'desc' in v ? v.desc : ""; r[v.name] = desc; return r; }, {});
    const type = Object.values(tableSchema).reduce((r, v) => { r[v.name] = v.type; return r; }, {});
    const format = Object.values(tableSchema).reduce((r, v) => { const format = {}; format.type= v.type; format.format = v.format; r[v.name] = format; return r; }, {});
    const schemaData = [desc, type, format];
    const scols = JSON.parse(JSON.stringify(columns));
    const schemaCols = scols.map((c) => {
      c.Cell = (props) => this.schemaCell(props, tableSchema, updateTableSchemaType, updateTableSchemaFormat, updateTableSchemaDesc);
      return c;
    });
    const dcols = JSON.parse(JSON.stringify(columns));
    const dataCols = dcols.map((c) => {
      c.Cell = (props) => this.renderEditable(props, updateDataFromCell, data);
      return c;
    });
    return (
      <div className="row">
        <div className="col-sm-1">
					<div id="schema-help">
            <div className="schema-help-row">Name <FontAwesomeIcon icon={faQuestionCircle} /></div>
            <div className="schema-help-row">Description <FontAwesomeIcon icon={faQuestionCircle} /></div>
            <div className="schema-help-row">Type <FontAwesomeIcon icon={faQuestionCircle} /></div>
            <div className="schema-help-row">Format <FontAwesomeIcon icon={faQuestionCircle} /></div>
					</div>
        </div>
        <div className="col-sm-11">
          {tableSchema ? (
            <ReactTable
              key="schema-table"
              sortable={false}
              data={schemaData}
              defaultPageSize={3}
              columns={schemaCols}
              showPagination={false}
            />
          ) : (
            <Loader />
          )}
          <span id="data-table">
            <ReactTable
              key="data-table"
              data={data}
              defaultPageSize={defaultPageSize}
              columns={dataCols} />
           </span>
         </div>
      </div>
    );
  }
}
