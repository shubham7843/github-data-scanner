/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.21.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from '../api';
import { V1alpha1VolumeError } from './v1alpha1VolumeError';

/**
* VolumeAttachmentStatus is the status of a VolumeAttachment request.
*/
export class V1alpha1VolumeAttachmentStatus {
    'attachError'?: V1alpha1VolumeError;
    /**
    * Indicates the volume is successfully attached. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
    */
    'attached': boolean;
    /**
    * Upon successful attach, this field is populated with any information returned by the attach operation that must be passed into subsequent WaitForAttach or Mount calls. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
    */
    'attachmentMetadata'?: { [key: string]: string; };
    'detachError'?: V1alpha1VolumeError;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "attachError",
            "baseName": "attachError",
            "type": "V1alpha1VolumeError"
        },
        {
            "name": "attached",
            "baseName": "attached",
            "type": "boolean"
        },
        {
            "name": "attachmentMetadata",
            "baseName": "attachmentMetadata",
            "type": "{ [key: string]: string; }"
        },
        {
            "name": "detachError",
            "baseName": "detachError",
            "type": "V1alpha1VolumeError"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1VolumeAttachmentStatus.attributeTypeMap;
    }
}

