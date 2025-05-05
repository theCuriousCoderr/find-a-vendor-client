"use client";

import React, { ChangeEvent, useState } from "react";
import { Edit3, Redo2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  updateCurrentEdit,
  updateSettingsCustomerInfo,
  updateSettingsVendorInfo,
} from "@/app/features/settings/settingsSlice";

function SettingsEdit({
  id,
  name,
  value,
  editable = true,
}: {
  id: string;
  name: string;
  value: string | string[];
  editable?: boolean;
}) {
  const [edit, setEdit] = useState({
    start: false,
    value: value,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { currentEdit, vendorInfo, customerInfo } = useSelector(
    (state: RootState) => state.settings
  );

  function startEdit() {
    dispatch(updateCurrentEdit({ name: name }));
    setEdit({ ...edit, start: true });
  }

  function saveEdit() {
    setEdit({ ...edit, start: false });
    dispatch(updateCurrentEdit({ name: name }));

    if (vendorInfo) {
      // handles updating of the nested location field
      if (["state", "city", "country"].includes(id)) {
        dispatch(
          updateSettingsVendorInfo({
            vendorInfo: {
              ...vendorInfo,
              location: { ...vendorInfo.location, [id]: edit.value },
            },
          })
        );
        return;
      }
      // handles updating of the nested socials field
      if (["instagram", "twitter", "whatsapp"].includes(id)) {
        dispatch(
          updateSettingsVendorInfo({
            vendorInfo: {
              ...vendorInfo,
              socials: { ...vendorInfo.socials, [id]: edit.value },
            },
          })
        );
        return;
      }

       // handles updating of the nested acct field
       if (["name", "number", "bank"].includes(id)) {
        dispatch(
          updateSettingsVendorInfo({
            vendorInfo: {
              ...vendorInfo,
              acct: { ...vendorInfo.acct, [id]: edit.value },
            },
          })
        );
        return;
      }

      
      // convert the string to array and store as an array
      if (id === "categories" || id === "deliveryRange") {
        dispatch(
          updateSettingsVendorInfo({
            vendorInfo: {
              ...vendorInfo,
              [id]: (edit.value as string).split(","),
            },
          })
        );
        return;
      }

      dispatch(
        updateSettingsVendorInfo({
          vendorInfo: { ...vendorInfo, [id]: edit.value },
        })
      );
    }

    if (customerInfo) {
      dispatch(
        updateSettingsCustomerInfo({
          customerInfo: { ...customerInfo, [id]: edit.value },
        })
      );
    }
  }

  function resetEdit() {
    setEdit({ ...edit, value: value });
  }

  function handleEdit(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEdit({ ...edit, value: val });
  }

  function getPlaceholder(edit_id: string) {
    if (edit_id === "categories") return "Perfumes, Bags, Cakes";
    if (edit_id === "phone") return "+2347037887923";
    if (edit_id === "deliveryRange")
      return `Nationwide, ${vendorInfo?.location.state}`;
    return "";
  }

  function attachAtSign(edit_id: string) {
    return ["storeTag", "instagram", "twitter"].includes(edit_id);
  }

  const editting = edit.start && currentEdit === name;
  return (
    <div>
      {/* <p>{JSON.stringify(vendorInfo)}</p> */}
      <p className="text-lg font-medium capitalize">{name}:</p>

      <div className="flex flex-wrap items-center">
        {editting ? (
          <div className="mr-2">
            <input
              autoFocus={true}
              spellCheck={false}
              onChange={handleEdit}
              value={edit.value}
              placeholder={getPlaceholder(id)}
              className="text-slate-800 text-base inline-flex w-auto outline-none border-b border-slate-900 min-w-fit"
            />
          </div>
        ) : (
          <p className="text-slate-400 text-base mr-2">
            {attachAtSign(id) && "@"}
            {edit.value}
          </p>
        )}

        {editable && (
          <div className="">
            {editting ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1 p-[2px] rounded-md border hover:bg-slate-100"
                >
                  <Save size={15} />
                  <p className="text-sm">Save</p>
                </button>
                <button
                  onClick={resetEdit}
                  className="flex items-center gap-1 p-[2px] rounded-md border hover:bg-slate-100"
                >
                  <Redo2 size={15} />
                  <p className="text-sm">Reset</p>
                </button>
              </div>
            ) : (
              <button
                onClick={startEdit}
                className="flex items-center gap-1 p-[2px] rounded-md border hover:bg-slate-100"
              >
                <Edit3 size={15} />
                <p className="text-sm">Edit</p>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsEdit;
