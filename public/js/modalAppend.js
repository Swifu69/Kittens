export default (parentEl) => {
  const modalParent = document.createElement("DIV");
  const modalDialog = document.createElement("DIV");
  const modalContent = document.createElement("DIV");
  const headerFive = document.createElement("H5");
  const closeModal = document.createElement("BUTTON");
  const closeModalIcon = document.createElement("SPAN");
  const modalBody = document.createElement("DIV");
  const modalFooter = document.createElement("DIV");
  const confirmButton = document.createElement("BUTTON");
  const deniedButton = document.createElement("BUTTON");
  const modalText = document.createElement("P");

  modalParent.className = "modal";

  modalParent.setAttribute("tabindex", "-1");

  modalParent.setAttribute("role", "dialog");

  modalDialog.className = "modal-dialog";

  modalDialog.setAttribute("role", "document");

  modalContent.className = "modal-header";

  headerFive.className = "modal-title";
  headerFive.innerText = "data.title;"

  closeModal.className = "close";

  closeModal.setAttribute("type", "button");
  closeModal.setAttribute("data-dismiss", "modal");
  closeModal.setAttribute("aria-label", "Close");

  closeModalIcon.setAttribute = ("aria-hidden", "true");

  closeModalIcon.innerHTML = "&times;";

  modalBody.className = "modal-body";
  modalBody.innerText = "data.body;"

  modalFooter.className = "modal-footer";

  confirmButton.className = "btn btn-primary";
  confirmButton.setAttribute("type", "button");
  confirmButton.innerText = "Yes";

  deniedButton.className = "btn btn-secondary";
  deniedButton.setAttribute("type", "button");
  deniedButton.setAttribute("data-dismiss", "modal");
  deniedButton.innerText = "NO!!!!";

  modalText.innerText = "data for modal"

  // modalfooter > modalbody > modaltitle > modalcontent > modaldialog > modal > return modal to func and delete cats append

  //Modal Header

  modalContent.appendChild(headerFive)
  modalContent.appendChild(closeModal)
  closeModal.appendChild(closeModalIcon)

  // Modal body

  modalBody.appendChild(modalText)

  // Modal Footer

  modalFooter.appendChild(confirmButton)
  modalFooter.appendChild(deniedButton)
};
