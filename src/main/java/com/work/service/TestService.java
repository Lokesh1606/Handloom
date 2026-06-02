package com.work.service;

import com.work.config.MinIOConfig;
import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.ObjectWriteResponse;
import io.minio.PutObjectArgs;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class TestService {

    private final MinIOConfig minIOClient;

    @Value("${minio.bucket-name}")
    private String minIOBucketName;

    public TestService(MinIOConfig minIOConfig, MinIOConfig minIOClient) {
        this.minIOClient = minIOClient;
    }

    public String uploadImage(MultipartFile photo) {
        boolean flag = false;
        try{
            flag = minIOClient.getMinioClient().bucketExists(BucketExistsArgs.builder().bucket(minIOBucketName).build());
            if(!flag){
                minIOClient.getMinioClient().makeBucket(MakeBucketArgs.builder().bucket(minIOBucketName).build());
            }
        }catch (Exception e){
            System.err.println("Exception at creating/fetching the bucket : "+e);
        }

        // Object (Image) Details
        String imageName = photo.getOriginalFilename();
        String imageExtension = imageName.substring(imageName.lastIndexOf("."));
        String profileUUID = UUID.randomUUID().toString()+ imageExtension;
        ObjectWriteResponse response = null;
        try{
            response = minIOClient.getMinioClient().putObject(
                PutObjectArgs.builder()
                    .bucket(minIOBucketName)
                    .object(profileUUID)
                    .stream(photo.getInputStream(), photo.getSize(), -1L)
                    .contentType(photo.getContentType())
                    .build()
            );
        }catch (Exception e){
            System.err.println("Exception at uploading image "+photo);
        }

        return response.toString();

    }
}
