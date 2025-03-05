
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

export default class ApiValidator {
 

  constructor() {
    
    }
 
  /**
   *  validates the response schema
   * @param responseBody of the response
   * @param schema JSON schema to validate against
    */
  async validateResponse(schema, responseBody) {
    
    const ajv = new Ajv({ schemaId: "auto" });
    //ajv.addMetaSchema(draft4MetaSchema);
     // Validate JSON response against schema
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);
    console.log(validate.errors);
    return isValid;
  }

}
