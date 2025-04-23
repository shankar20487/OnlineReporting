// Include playwright module
import { expect } from '@playwright/test';
import endpoint from '../config/endpoint';

// Create class
export default class GenerateReportEndpoint {
    constructor(baseURL, reportName) {
        this.baseURL = baseURL;
        this.reportName = reportName;
    }

    async generateReportApi(headers = {}, data) {
        try {
            const apiURL = this.baseURL + `${endpoint.endpoints.generatereport}`;
            console.log(apiURL);
            const response = await fetch(`${apiURL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error in POST request:", error);
            throw error; // Re-throw for handling
        }
    }

    async generateEzClaimPayReceiptPayload(startDate, endDate, patients, sortby = "", paymentMethod = '', transactionID = '', lastDigt = '') {
        let payload;
        if (patients != undefined) {
            payload = {
                reportId: this.reportName,
                options: {
                    message: '',
                    sortby: sortby || 'patientName',
                    patient: patients,
                    paymentMethod: [paymentMethod],
                    paymentRef: transactionID || '',
                    paymentAdditionalRef: lastDigt || '',
                    usePatientBillingAddress: true,
                    paymentDate: { startDate: startDate, endDate: endDate },
                    paymentEnteredDate: { startDate: startDate, endDate: endDate }
                }
            };
        } else {
            payload = {
                reportId: this.reportName,
                options: {
                    message: '',
                    sortby: sortby,
                    patient: '',
                    paymentMethod: [paymentMethod],
                    paymentRef: '',
                    paymentAdditionalRef: '',
                    usePatientBillingAddress: false,
                    paymentDate: { startDate: startDate, endDate: endDate },
                    paymentEnteredDate: { startDate: startDate, endDate: endDate }
                }
            };
        }
        return payload;
    }

    async generatePatientLedgerPayload(patients, startDate, endData, sortby = "", acctStartsWith = '', patientClassification = '') {
        let payload;
        if (patients === 1) {
            payload = {
                reportId: this.reportName,
                options: {
                    acctStartsWith: acctStartsWith || "",
                    patient: "",
                    patientClassification: [patientClassification] || "",
                    dateOfService: {
                        startDate: startDate,
                        endDate: endData
                    },
                    sortby: sortby || ""
                }
            };
        } else if (patients === 2) {
            payload = {
                reportId: this.reportName,
                options: {
                    acctStartsWith: acctStartsWith || "",
                    patient: 5685,
                    patientClassification: [patientClassification] || "",
                    dateOfService: {
                        startDate: startDate,
                        endDate: endData
                    },
                    sortby: sortby || ""
                }
            };
        } else {
            payload = {
                reportId: this.reportName,
                options: {
                    acctStartsWith: acctStartsWith || "",
                    patient: patients,
                    patientClassification: [patientClassification] || "",
                    dateOfService: {
                        startDate: startDate,
                        endDate: endData
                    },
                    sortby: sortby || ""
                }
            };
        }
        return payload;
    }

    async generatePaymentListPayload(groupBy = '', minimumBalance, hideDisbursementDetails = false, minimumPayment, patientClassification = '', patient = 1, paymentMethod = '',sortby='') {
        let apiPayload;
        if(sortby === ''){
        apiPayload = {
            reportId: this.reportName,
            options: {
                groupBy: groupBy,
                hideDisbursementDetails: hideDisbursementDetails,
                message: "",
                minimumBalance: minimumBalance,
                minimumPayment: minimumPayment,
                patientClassification: [patientClassification],
                patient: patient || '',
                payer: '',
                paymentEnteredDate: "",
                paymentDate: "",
                paymentMethod: [paymentMethod],
                paymentNote: "",
                paymentSource: "",
                paymentRef: "",
                paymentAdditionalRef: "",
                SortBy: ""
            }
        };
        
        }
        else{

            apiPayload = {
                reportId: this.reportName,
                options: {
                    groupBy: groupBy,
                    hideDisbursementDetails: hideDisbursementDetails,
                    message: "",
                    minimumBalance: minimumBalance,
                    minimumPayment: minimumPayment,
                    patientClassification: [patientClassification],
                    patient:  '',
                    payer: '',
                    paymentEnteredDate: "",
                    paymentDate: "",
                    paymentMethod: [paymentMethod],
                    paymentNote: "",
                    paymentSource: "",
                    paymentRef: "",
                    paymentAdditionalRef: "",
                    SortBy: sortby || ""
                }
            };
           
        }
        return apiPayload;
    }
    async generatePaymentListPayloadV2(patient, payer, startDate, endDate, paymentSource, paymentRef,paymentAdditionalRef,sortby='',hideDisbursementDetails=false,paymentNote='') {
        let apiPayload;
        if (patient === '') {
        apiPayload = {
            reportId: this.reportName,
            options: {
                groupBy: "",
                hideDisbursementDetails: hideDisbursementDetails || "",
                message: "",
                minimumBalance: "",
                minimumPayment: "",
                patientClassification: [],
                patient:  '',
                payer: [payer] || '',
                paymentEnteredDate: {
                    startDate: startDate,
                    endDate: endDate
                }
            },
            paymentDate: {
                startDate: startDate,
                endDate: endDate
            },
            paymentMethod: [],
            paymentNote: paymentNote|| "",
            paymentSource: paymentSource,
            paymentRef: paymentRef,
            paymentAdditionalRef: paymentAdditionalRef,
            SortBy: sortby || ""
        }
      
    }
      else{
        apiPayload = {
            reportId: this.reportName,
            options: {
                groupBy: "",
                hideDisbursementDetails: hideDisbursementDetails || "",
                message: "",
                minimumBalance: "",
                minimumPayment: "",
                patientClassification: [],
                patient: patient || '',
                payer: '',
                paymentEnteredDate: {
                    startDate: startDate,
                    endDate: endDate
                }
            },
            paymentDate: {
                startDate: startDate,
                endDate: endDate
            },
            paymentMethod: [],
            paymentNote: paymentNote|| "",
            paymentSource: paymentSource,
            paymentRef: paymentRef,
            paymentAdditionalRef: paymentAdditionalRef,
            SortBy: sortby || ""
        };
       
    }
    return apiPayload;
      }   
      
      async generatePatientFollowupPayload(isdefault =false,minimumStatement='',agedDays='',minimumBalance='',patient='',patientClassification='',startDate='',endDate='') {
        let apiPayload;

        if(isdefault === true){
            apiPayload = {
                reportId: this.reportName,
                options: {
                    minStatements:"",
                    agedDays: "",
                    minimumBalance: "",
                    patient: "",
                    patientClassification: "",
                    serviceDate: ""
                    
                }
            };
        }
        else {
            apiPayload = {
                reportId: this.reportName,
                options: {
                    minStatements:minimumStatement,
                    agedDays:agedDays,
                    minimumBalance: minimumBalance,
                    patient: patient,
                    patientClassification: [patientClassification],
                    serviceDate: {
                        startDate: startDate || "",
                        endDate: endDate || ""
                    },
                }
            };
        }   
        return apiPayload;
  }
   
  async generatePayloadClaimStatement(patient, startDate, endDate, sortby = '', claimId = "",minimumBalance='',claimBillingProvider=1) {
        let payload;
        if (patient !== '') {
            payload = {
                reportId: this.reportName,
                options: {
                    patient: patient ||"",
                    claimBillingProvider:  [],
                    minimumBalance:"",
                    claimID:claimId,
                    serviceDate: "",
                    sortby: sortby || ""
                }
            };
        }  else {
            if(claimBillingProvider === 1) {
                claimBillingProvider = [];
            }
            else{
                claimBillingProvider = [claimBillingProvider];
            }
            if(startDate === '' && endDate === '') {
                payload = {
                    reportId: this.reportName,
                    options: {
                        patient: "" ,
                        claimBillingProvider: []  || claimBillingProvider ,
                        minimumBalance: minimumBalance || "",
                        claimID:claimId || "",
                        serviceDate: "",
                        sortby: sortby || ""
                    }
                };
            }
            else{
                payload = {
                    reportId: this.reportName,
                    options: {
                        patient: "" ,
                        claimBillingProvider: []  || claimBillingProvider ,
                        minimumBalance: minimumBalance || "",
                        claimID: "",
                        serviceDate: {
                            startDate: startDate,
                            endDate: endDate
                        },
                        sortby: sortby || ""
                    }
                }; 

            }
           
        }
        return payload;

 } 
 
 async generateDeleteRecordPayload(startDate, endDate, deletedItemType=["Payer"]) {
    let payload
    if(startDate === '' && endDate === '') {
        payload = {
            reportId: this.reportName,
            options: {
                deletedItemType: deletedItemType,
                deletedDate: {
                    startDate: "",
                    endDate: ""
                }
            }
        };
    }
    else{
        payload = {
            reportId: this.reportName,
            options: {
                deletedItemType: "",
                deletedDate: {
                    startDate: startDate || "",
                    endDate: endDate || ""
                }
            }
        };
    }
   return payload;
 
}

async generateInsuranceFollowupPayload(isdefault =false,payer=1,facility,patient=1,patientClassification='',payerClassification='',startDate='',endDate='') {
    let apiPayload;

    if(isdefault === true){
        apiPayload = {
            reportId: this.reportName,
            options: {
                payer:"",
                facility:"",
                patient: "",
                patientClassification: "",
                payerClassification: "",
                serviceDate: {
                    startDate: startDate || "",
                    endDate: endDate || ""
                
            }
        }
    }
}
    else {
        if(payer === 1 || payer === '') {
            payer = [];
        }
        else{
            payer = [payer];
        }
        if(patient === 1 || patient === '') {
            patient = "";
        }
      
        if(facility === 1 || facility === '') {
            facility = [];
        }
        else{
            facility = [facility];
        }
        apiPayload = {
            reportId: this.reportName,
            options: {
                payer: "" ||payer, 
                facility: "" || facility ,
                patient: "" || patient ,
                patientClassification: "" || [patientClassification] ,
                payerClassification: "" || [payerClassification] ,
                serviceDate: ""
            }
                
        };
   }   
    return apiPayload;
  }

  async generateTransactionListPayload(startDate, endDate, transactionType = [''], patient = '') {
    let payload;
    if (transactionType !== '') {
        payload = {
            reportId: this.reportName,
            options: {
                transactionType:transactionType|| "",
                groupBy: "",
                hideDetail:true,
                patient: patient || "",
                transactionDate: {
                    startDate: startDate || "",
                    endDate: endDate || ""
                },
                createdDate: {
                    startDate: startDate || "",
                    endDate: endDate || ""
                }
            }
        };
    } else {
        payload = {
            reportId: this.reportName,
            options: {
                transactionType: "",
                groupBy: "",
                hideDetail:false,
                patient: "",
                transactionDate: "",
                createdDate: ""
            }
        };
    }
    return payload;
  }

}