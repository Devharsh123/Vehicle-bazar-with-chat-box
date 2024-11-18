// Unit tests for: handleMessage

import { ChatGateway } from '../chat.gateway';
import { AddMessageDto } from '../dto/add-message.dto';

// Mock classes
class MockServer {
  emit = jest.fn();
}

class MockChatService {
  saveMessage = jest.fn();
}

describe('ChatGateway.handleMessage() handleMessage method', () => {
  let chatGateway: ChatGateway;
  let mockServer: MockServer;
  let mockChatService: MockChatService;

  beforeEach(() => {
    mockServer = new MockServer() as any;
    mockChatService = new MockChatService() as any;
    chatGateway = new ChatGateway(mockChatService as any);
    chatGateway.server = mockServer as any;
  });

  describe('Happy Path', () => {
    it('should save the message and emit it to the server', async () => {
      // Arrange
      const payload: AddMessageDto = {
        buyerId: 'buyer123',
        vendorId: 'vendor456',
        content: 'Hello, world!',
      } as any;

      mockChatService.saveMessage.mockResolvedValue(payload as any);

      // Act
      const result = await chatGateway.handleMessage(payload);

      // Assert
      expect(mockChatService.saveMessage).toHaveBeenCalledWith(payload);
      expect(mockServer.emit).toHaveBeenCalledWith('chat', payload);
      expect(result).toEqual(payload);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content gracefully', async () => {
      // Arrange
      const payload: AddMessageDto = {
        buyerId: 'buyer123',
        vendorId: 'vendor456',
        content: '',
      } as any;

      mockChatService.saveMessage.mockResolvedValue(payload as any);

      // Act
      const result = await chatGateway.handleMessage(payload);

      // Assert
      expect(mockChatService.saveMessage).toHaveBeenCalledWith(payload);
      expect(mockServer.emit).toHaveBeenCalledWith('chat', payload);
      expect(result).toEqual(payload);
    });

    it('should handle missing buyerId gracefully', async () => {
      // Arrange
      const payload: AddMessageDto = {
        buyerId: '',
        vendorId: 'vendor456',
        content: 'Hello, world!',
      } as any;

      mockChatService.saveMessage.mockResolvedValue(payload as any);

      // Act
      const result = await chatGateway.handleMessage(payload);

      // Assert
      expect(mockChatService.saveMessage).toHaveBeenCalledWith(payload);
      expect(mockServer.emit).toHaveBeenCalledWith('chat', payload);
      expect(result).toEqual(payload);
    });

    it('should handle missing vendorId gracefully', async () => {
      // Arrange
      const payload: AddMessageDto = {
        buyerId: 'buyer123',
        vendorId: '',
        content: 'Hello, world!',
      } as any;

      mockChatService.saveMessage.mockResolvedValue(payload as any);

      // Act
      const result = await chatGateway.handleMessage(payload);

      // Assert
      expect(mockChatService.saveMessage).toHaveBeenCalledWith(payload);
      expect(mockServer.emit).toHaveBeenCalledWith('chat', payload);
      expect(result).toEqual(payload);
    });

    it('should handle saveMessage rejection gracefully', async () => {
      // Arrange
      const payload: AddMessageDto = {
        buyerId: 'buyer123',
        vendorId: 'vendor456',
        content: 'Hello, world!',
      } as any;

      mockChatService.saveMessage.mockRejectedValue(
        new Error('Save failed') as never,
      );

      // Act & Assert
      await expect(chatGateway.handleMessage(payload)).rejects.toThrow(
        'Save failed',
      );
      expect(mockChatService.saveMessage).toHaveBeenCalledWith(payload);
      expect(mockServer.emit).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: handleMessage
