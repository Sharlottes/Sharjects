import { useSnackbar, VariantType } from "notistack";

const useShowAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (message: string, variant: VariantType) =>
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: "top", horizontal: "left" },
      autoHideDuration: 2000,
    });
};
export default useShowAlert;
