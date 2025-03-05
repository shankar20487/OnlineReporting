// Inlcude playwright module
import { APIRequestContext, APIResponse } from '@playwright/test';


// create cl
export default class AccountReceivableEndpoint {
        constructor(baseURL) {
            this.baseURL = baseURL;
        }
    
        async generateReportApi(data, headers = {}) {
            try {
                const response = await fetch(`${this.baseURL}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...headers
                    },
                    body: JSON.stringify(data)
                });
    
               return await response.json(); // Parse JSON response
            } catch (error) {
                console.error("Error in POST request:", error);
                throw error; // Re-throw for handling
            }
        }
    }
    
   
    


