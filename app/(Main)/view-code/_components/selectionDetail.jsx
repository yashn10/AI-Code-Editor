"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { History } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const SelectionDetail = ({ record }) => {

  const router = useRouter();

  const visitHistory = () => {
    router.push(`/view-code/history`);
  };
  

  return (

    <div className="p-3 bg-gray-100" style={{ height: "90vh" }}>
      <h1 className="text-2xl m-2 text-center">Code Editor</h1>

      {record && (
        <div>
          <p>
            <Image src={record?.imageURL} alt="Image" width={300} height={100} />
          </p>
          <div className="mt-3">
            <h2>Model Used:</h2>
            <Input defaultValue={record?.model} className="bg-white text-gray-900" disabled />
          </div>
          <div className="mt-3">
            <h2>Description:</h2>
            <Textarea defaultValue={record?.prompt} className="bg-white text-gray-700" rows={5} disabled />
          </div>
          <Button className="mt-3 w-full" onClick={visitHistory}>
            <History />View History
          </Button>
        </div>
      )}

    </div>

  );
};

export default SelectionDetail;
