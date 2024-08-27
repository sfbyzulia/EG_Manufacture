({
    updateLeadStatus: function(component, event, helper) {
        // Get the lead record
        var leadRecord = component.get("v.lead");

        // Get the user comment from the input field
        var userComment = component.find("commentInput").get("v.value");

        // Check if a comment is provided or not
        if (!userComment) {
            userComment = "Aucun commentaire fourni.";  // Default message if no comment is provided
        }

        // Update the Status field to 'Contacted'
        if (leadRecord && leadRecord.Status !== undefined) {
            leadRecord.Status = 'Contacted';

            // Save the updated Lead record
            component.find("leadRecord").saveRecord($A.getCallback(function(saveResult) {
                if (saveResult.state === "SUCCESS") {
                    // Show success message with the user comment
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        message: "Statut a été modifié avec succès. Commentaire : " + userComment,
                        type: "success"
                    });
                    toastEvent.fire();

                    // Close the quick action immediately after the update
                    $A.get("e.force:closeQuickAction").fire();
                } else if (saveResult.state === "ERROR") {
                    // Handle any errors during save
                    var errors = saveResult.error;
                    console.error(errors);
                }
            }));
        }
    }
});
