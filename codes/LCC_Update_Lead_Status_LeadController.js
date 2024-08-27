({
    updateLeadStatus: function(component, event, helper) {
        // Get the lead record
        var leadRecord = component.get("v.lead");

        // Update the Status field to 'Contacted'
        if (leadRecord && leadRecord.Status !== undefined) {
            leadRecord.Status = 'Contacted';

            // Save the updated Lead record
            component.find("leadRecord").saveRecord($A.getCallback(function(saveResult) {
                if (saveResult.state === "SUCCESS") {
                    // Show success message in French
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        message: "Statut a été modifié avec succès.",
                        type: "success"
                    });
                    toastEvent.fire();

                    // Close the quick action immediately after the update
                    $A.get("e.force:closeQuickAction").fire();
                }
            }));
        }
    }
});