import Swal from "sweetalert2";

export function swalError(msg) {
  return Swal.fire({
    title: "Error!",
    text: msg,
    icon: "error",
    confirmButtonText: "Cool",
  });
}

export function swalSuccess(msg) {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    timer: 2000,
    html: `
        <div style="text-align: left; margin-left: 10px">
        ${msg}
        </div>`,
    toast: true,
    showConfirmButton: false,
  });
}

export function swalConfirmDelete() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
}

export function swalConfirm() {
  return Swal.fire({
    title: "Submit data?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
}
