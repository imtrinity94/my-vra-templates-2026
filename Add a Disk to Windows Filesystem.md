<img width="425" height="284" alt="image" src="https://github.com/user-attachments/assets/2c1d7f23-e3a6-4598-a4ad-a560f8f31a44" />

<img width="270" height="70" alt="image" src="https://github.com/user-attachments/assets/309f1b96-7f5f-4c88-8a3e-c2b5da22f932" />

<img width="217" height="345" alt="image" src="https://github.com/user-attachments/assets/a7fb21a7-399c-47d4-a089-ec2d7496a88f" />

<img width="377" height="295" alt="image" src="https://github.com/user-attachments/assets/471a5325-56db-4442-9cc7-c355e2af47e2" />

```powershell
# Step 1: Rescan the storage bus to ensure Windows sees the newly added vSphere disk
Write-Host "Rescanning storage bus..." -ForegroundColor Cyan
Update-HostStorageCache

# Step 2: Find all uninitialized disks (Partition Style is 'RAW')
$newDisks = Get-Disk | Where-Object { $_.PartitionStyle -eq 'RAW' }

if (-not $newDisks) {
    Write-Host "No uninitialized (RAW) disks found. Ensure the disk was successfully added in vCenter." -ForegroundColor Yellow
    exit
}

# Step 3: Loop through each new disk and provision it
foreach ($disk in $newDisks) {
    Write-Host "Found uninitialized disk: Number $($disk.Number), Size $([math]::Round($disk.Size / 1GB, 2)) GB" -ForegroundColor Green
    
    try {
        # Initialize as GPT, create partition, assign drive letter, and format to NTFS
        $disk | Initialize-Disk -PartitionStyle GPT -PassThru | 
                New-Partition -AssignDriveLetter -UseMaximumSize | 
                Format-Volume -FileSystem NTFS -NewFileSystemLabel "NewDataDisk" -Confirm:$false
                
        Write-Host "Disk $($disk.Number) has been successfully initialized, formatted, and mounted." -ForegroundColor Green
    }
    catch {
        Write-Error "Failed to process Disk $($disk.Number). Error: $_"
    }
}
```

<img width="531" height="295" alt="image" src="https://github.com/user-attachments/assets/292a7e3c-437b-4c61-8232-1aba7d873bcd" />
<img width="588" height="291" alt="image" src="https://github.com/user-attachments/assets/b16d9253-cf01-4b0e-88e5-89630e714e66" />
